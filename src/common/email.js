export const textarea=" "```plantuml
@startmindmap
title 我的课程
+ 我的课程
++ 周莹
+++ <&star>MyCourses我的课程
+++ <&star>CoursesCard课程卡片
+++ <&star>EroorCoursesRemindDialog异常课程提醒
+++ <&star>Calendar日历组件改造
+++ <&star>ClassScheduleStudentDetail
+++ <&star>LectureRecordsList讲义记录
+++ <&star>MyCoursesDetailDrawer我的课程详情抽屉
+++ <&star>VacateDialog请假弹窗
++ 袁雄风
+++ <&star>ChooseLectureNotesDialog关联讲义弹窗
+++ <&star>ChangeLectureNotesDialog更换讲义
+++ <&star>ErrorLogs异常记录
+++ <&star>ErrorLogDetail异常记录详情
+++ <&star>ErrorExplainDialog异常说明弹窗
+++ <&star>ErrorLogsList异常记录列表
@endmindmap
```

```plantuml
@startgantt
title 我的课程项目甘特图
sunday are closed
project starts the 2020-8-26
scale 3
-- 进入开发 --
[开发]  starts 2020-8-27 and ends 2020-8-29 and is 0% complete
[联调自测]  lasts 1 days and is 0% complete
[开发]->[联调自测]
[提测] happens 2020-9-1
-- 提测 --
[提测]->[测试]
[测试] starts 2020-9-1
[测试] lasts 2 days and is 0% complete
today is colored in #AAF
@endgantt
```

产品文档
http://showdoc.sishuxuefu.com:38020/web/#/26?page_id=3233

技术文档:
http://showdoc.sishuxuefu.com:38020/web/#/24?page_id=3246

估时文档
周莹 22h≈3PD
http://showdoc.sishuxuefu.com:38020/web/#/25?page_id=3244
袁雄风 21h≈ 3PD：
http://showdoc.sishuxuefu.com:38020/web/#/25?page_id=3247

开发开始时间
2020-08-27 09:30

开发结束时间
2020-08-29 18:30

预计协作方等待时间
暂无

联调自测完成时间
2020-08-31 18:30

提测时间
2020-09-01 09:30"
