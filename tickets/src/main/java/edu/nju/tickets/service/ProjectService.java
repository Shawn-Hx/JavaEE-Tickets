package edu.nju.tickets.service;

import edu.nju.tickets.vo.ProjectAddVO;
import edu.nju.tickets.vo.ProjectIncomeVO;
import edu.nju.tickets.vo.ProjectInfoVO;

import java.io.File;
import java.util.List;

public interface ProjectService {

    /**
     * 搜索活动
     *
     * @param keywords  关键词
     * @return          project列表
     */
    List<ProjectInfoVO> searchProject(final String keywords);

    /**
     * 根据id获取活动信息
     *
     * @param id        id
     * @return          project信息
     */
    ProjectInfoVO getProjectInfo(final Integer id);

    /**
     * 按指定顺序获取全部活动
     *
     * @param property  排序属性
     * @param order     顺序（正序／逆序）
     * @return          project列表
     */
    List<ProjectInfoVO> getProjects(final String property, final String order);

    /**
     * 按类别获取活动
     *
     * @param type      类别
     * @return          project列表
     */
    List<ProjectInfoVO> getProjectsByType(final String type);

    /**
     * 获取场馆活动
     *
     * @param venueId   场馆id
     * @param state     活动进行情况
     * @return          project列表
     */
    List<ProjectInfoVO> getProjectsByVenue(final Integer venueId, final String state);

    /**
     * 获取场馆活动
     *
     * @param identification    场馆识别码
     * @param state             活动进行情况
     * @return                  project列表
     */
    List<ProjectInfoVO> getProjectsByVenue(final String identification, final String state);

    /**
     * 根据是否分配收入获取活动
     *
     * @param isAllocated       是否分配
     * @return                  project收入信息列表
     */
    List<ProjectIncomeVO> getProjectsByIsAllocated(final boolean isAllocated);

    /**
     * 场馆发布活动
     *
     * @param identification    识别码
     * @param vo                发布信息
     *
     * @return                  活动id
     */
    Integer releaseProject(final String identification, final ProjectAddVO vo);

    /**
     * 上传活动海报
     *
     * @param identification    识别码
     * @param projectId         活动id
     * @param poster            海报图片
     */
    void uploadProjectPoster(final String identification, final Integer projectId, final File poster);

    /**
     * 结算活动收入
     *
     * @param projectId         活动id
     * @param ratio             平台所得比例
     */
    void allocateProject(final Integer projectId, final int ratio);

}
