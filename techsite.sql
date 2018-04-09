/*
Navicat MySQL Data Transfer

Source Server         : jiawei
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : techsite

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-08 16:56:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `tags` text NOT NULL,
  `time` text NOT NULL,
  `description` text,
  `codeText` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '个人博客上线啦！！', '闲聊', '2018-04-2', '', '#t 个人博客上线啦！！\n\n当初刚开始接触前端时，我就希望自己有朝一日能够独立地开发一个网站，而今天就是这个希望变成现实的时候了，撒花。\n\n\n我的博客内容主要会有两个方面：web 技术学习总结和生活感悟。好像有点 kind of personal，不过也没关系，我估计也没别的人看，主要是给自己记录一下，日省吾身。');
INSERT INTO `article` VALUES ('2', '说说 java 里面的泛型', 'java,泛型', '2018-04-4', '## 前言\n\n公司 android 项目需要有人接手，任务落在了我这个既不懂 java 也不懂 android 的前端上，蛋疼的是我擅（zhi）长（hui）写的 javascript 还是弱类型语言啊！想不到博客一建好的第一篇文章居然不是老本行前端或 node 的，造化啊！后续会不定期更新与 android 相关的东西。\n\n## 概念\n\n上手一波查概念：\n\n> 泛型是程序设计语言的一种特性。允许程序员在强类型程序设计语言中编写代码时定义一些可变部分，那些部分在使用前必须作出指明。\n\n**泛型，又称“类型参数化”，顾名思义，就是允许把一种对象类型当成参数传递处理**。这个就很灵性了，相比初始化固定一种类型，泛型应该是具有更广泛的类型处理能力。\n', '#t 说说 java 里面的泛型\n\n## 前言\n\n公司 android 项目需要有人接手，任务落在了我这个既不懂 java 也不懂 android 的前端上，蛋疼的是我擅（zhi）长（hui）写的 javascript 还是弱类型语言啊！想不到博客一建好的第一篇文章居然不是老本行前端或 node 的，造化啊！后续会不定期更新与 android 相关的东西。\n\n## 概念\n\n上手一波查概念：\n\n> 泛型是程序设计语言的一种特性。允许程序员在强类型程序设计语言中编写代码时定义一些可变部分，那些部分在使用前必须作出指明。\n\n**泛型，又称“类型参数化”，顾名思义，就是允许把一种对象类型当成参数传递处理**。这个就很灵性了，相比初始化固定一种类型，泛型应该是具有更广泛的类型处理能力。\n<!-- more -->\n\n\n## 泛型的使用\n\n泛型有三种使用方式：泛型类、泛型接口、泛型方法。\n\n### 泛型类\n\n泛型类型用于类的定义中，被称为泛型类。通过泛型可以完成对一组类的操作对外开放相同的接口。最典型的就是各种容器类，如：`List`、`Set`、`Map`。这里举个栗子：\n\n```java\npublic class Student<T> {\n  private T word; // 要说的内容\n  \n  public Student(T word) {\n    this.word = word;\n  }\n\n  public T say() {\n    return word; // 说话动作\n  }\n}\n```\n\n例子中的`<T>`就是泛型的声明标志，而`T`则代表了某种数据类型。在类内部，还有一个类型为`T`的私有属性，一个接受`T`类型参数的构造器和一个将返回`T`类型的函数`say`。下面举个栗子，去具体化泛型的使用：\n```java\nStudent student_string = new Student<String>(\"Hello world!\");\nStudent student_integer = new Student<Integer>(123456);\n\nstudent_string.say(); // \"Hello world!\"\nstudent_integer.say(); // 123456\n```\n\n同一个类分别定义了一个具体为`String`类型和`Integer`类型的的实例。**定义的泛型类，就一定要传入泛型类型实参么？答案是否定的。** 在使用泛型的时候如果传入泛型实参，则会根据传入的泛型实参做相应的限制，此时泛型才会起到本应起到的限制作用。如果不传入泛型类型实参的话，在泛型类中使用泛型的方法或成员变量定义的类型可以为任何的类型。举个栗子：\n\n```java\nStudent student1 = new Student(\"string\");\nSrudent student2 = new Student(123);\n\nstudnet1.say(); // \"string\"\nstuendt2.say(); // 123\n```\n\n有点要注意的：**泛型的类型参数只能是类类型，不能是简单类型**。\n\n### 泛型接口\n\n泛型接口与泛型类的定义及使用基本相同。举个栗子：\n\n```java\n// 定义一个泛型接口\npublic interface StudentActivity<T> {\n  public T write();\n}\n\n// 定义一个继承接口的学生类\npublic class Student<T> implements StudentActivity<T> {\n  private T word;\n\n  public Student(T word) {\n    this.word = word;\n  }\n\n  @Override\n  public T write() {\n    return word;\n  }\n}\n\n// 使用\nStudent student = new Student<String>(\"Hello world!\");\nstudent.write(); // \"Hello world!\"\n```\n\n### 泛型方法\n\n**泛型类，是在实例化类的时候指明泛型的具体类型；泛型方法，是在调用方法的时候指明泛型的具体类型**。\n\n泛型方法好像比较复杂，我其实没有太多时间、心思或兴趣在 java 上，所以就先记到这里了。如果后面有所涉及，再回来写吧。');

-- ----------------------------
-- Table structure for `developer`
-- ----------------------------
DROP TABLE IF EXISTS `developer`;
CREATE TABLE `developer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `token` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of developer
-- ----------------------------
INSERT INTO `developer` VALUES ('1', '谭家威', 'wayne');

-- ----------------------------
-- Table structure for `tags`
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', '闲聊', '1');
INSERT INTO `tags` VALUES ('2', 'java', '1');
INSERT INTO `tags` VALUES ('3', '泛型', '1');
