'use strict';

$().ready(function () {
    let identity = checkIdentity();
    if (identity === 'visitor') {
        showSignInDialog();
        return;
    }
    if (identity !== 'manager') {
        window.location.href = '/';
        return;
    }
    $('#check_register').click();
});

function checkVenueRegister(venueId, isPass) {
    $.ajax({
        type: 'POST',
        url: '/api/venues/id/' + venueId,
        data: {
            isPass: isPass
        },
        success: function (result) {
            alert(result.message);
            $('#check_register').click();
        },
        error: function (xhr) {
            alert('操作失败，请重试');
        }
    });
}

function addRegisterVenues(venues) {
    let list = $('#list');
    list.empty();
    if (venues.length === 0) {
        addEmptyPrompt('注册场馆均已审核');
        return;
    }
    for (let i = 0; i < venues.length; i++) {
        let item = venues[i];
        list.append(`
            <div class="col-lg-9">
                <h6>${item.name}</h6>
                <label>地址 : </label><span>&nbsp;${item.location}</span><br>
                <label>座位数 : </label><span>&nbsp;${item.seatNumber}</span><br>
                <label>联系方式 : </label><span>&nbsp;${item.email}</span><br>
                <label>注册时间 : </label><span>&nbsp;${item.registerTime}</span>
            </div>
            <div class="col-lg-3">
                <a id="pass_${item.id}" class="btn btn-pass">通过</a><br>
                <a id="not_pass_${item.id}" class="btn btn-unPass">不通过</a>
            </div>
            <hr width="710px">
            <script>
                $("#pass_${item.id}").click(function () {
                    checkVenueRegister(${item.id}, true);
                });
                $("#not_pass_${item.id}").click(function () {
                    checkVenueRegister(${item.id}, false);
                });
            </script>
        `);
    }
}

function showRegisterVenues() {
    $.ajax({
        type: 'GET',
        url: '/api/venues/check/register/false',
        data: {},
        success: function (result) {
            if (result.success) {
                addRegisterVenues(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            addEmptyPrompt('获取出错，请重试');
        }
    });
}

function checkVenueModify(modifyId, isPass) {
    $.ajax({
        type: 'POST',
        url: '/api/venues/modify/' + modifyId,
        data: {
            isPass: isPass
        },
        success: function (result) {
            alert(result.message);
            $('#check_modify').click();
        },
        error: function (xhr) {
            alert('操作失败，请重试');
        }
    });
}

function addModifyVenues(venueModifies) {
    let list = $('#list');
    list.empty();
    if (venueModifies.length === 0) {
        addEmptyPrompt('修改场馆均已审核');
        return;
    }
    for (let i = 0; i < venueModifies.length; i++) {
        let item = venueModifies[i];
        let newName = item.newName === null ? item.venueInfoVO.name : item.newName;
        let newSeatNumber = item.newSeatNumber === null ? item.venueInfoVO.seatNumber : item.newSeatNumber;
        let newLocation = item.newLocation === null ? item.venueInfoVO.location : item.newLocation;
        list.append(`
            <div class="col-lg-9">
                <p style="color: #2a6496">于 ${item.applyTime} 提交申请</p>
                <h6>${item.venueInfoVO.name}</h6>
                <span>场馆名 : </span><label>&nbsp;${item.venueInfoVO.name}
                <span style="margin: 0 5px; color: chocolate"> -> </span>${newName}</label><br>
                <span>座位数 : </span><label>&nbsp;${item.venueInfoVO.seatNumber}
                <span style="margin: 0 5px; color: chocolate"> -> </span>${newSeatNumber}</label><br>
                <span>地址 : </span><label>&nbsp;${item.venueInfoVO.location}
                <span style="margin: 0 5px; color: chocolate"> -> </span>${newLocation}</label>
            </div>
            <div class="col-lg-3">
                <a id="pass_modify_${item.id}" class="btn btn-pass">通过</a><br>
                <a id="not_pass_modify_${item.id}" class="btn btn-unPass">不通过</a>
            </div>
            <hr width="710px">
            <script>
                $("#pass_modify_${item.id}").click(function () {
                    checkVenueModify(${item.id}, true);
                });
                $("#not_pass_modify_${item.id}").click(function () {
                    checkVenueModify(${item.id}, false);
                });
            </script>
        `);
    }
}


function showModifyVenues() {
    $.ajax({
        type: 'GET',
        url: '/api/venues/check/modify/false',
        data: {},
        success: function (result) {
            if (result.success) {
                addModifyVenues(result.data);
            } else {
                alert(result.message);
            }
        },
        error: function (xhr) {
            addEmptyPrompt('获取出错，请重试');
        }
    });
}

function showLeftNavItem(item) {
    $('#check_register').removeClass("active");
    $('#check_modify').removeClass("active");

    $('#' + item).addClass("active");
}

$('#check_modify').click(function () {
    showLeftNavItem('check_modify');
    showModifyVenues();
    $('#type').text("修改申请");
});

$('#check_register').click(function () {
    showLeftNavItem('check_register');
    showRegisterVenues();
    $('#type').text("注册申请");
});
