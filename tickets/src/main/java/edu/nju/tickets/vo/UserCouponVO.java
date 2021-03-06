package edu.nju.tickets.vo;

public class UserCouponVO {
    private Integer id;
    private String name;
    private int money;
    private int requirePoints;
    private int number;

    public UserCouponVO() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public int getRequirePoints() {
        return requirePoints;
    }

    public void setRequirePoints(int requirePoints) {
        this.requirePoints = requirePoints;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
