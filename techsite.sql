/*
Navicat MySQL Data Transfer

Source Server         : jiawei
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : techsite

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-23 17:27:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `author` text,
  `category` text NOT NULL,
  `tags` text NOT NULL,
  `time` text NOT NULL,
  `codeText` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('64', 'javascript 正则校验', null, '前端', 'javascript,正则', '2018-01-23', '## 前言\n接触与研究代码的时间不长，却早早就知道了正则表达式大体是什么以及它能实现的强大功能。但是我一直没有深入，因为这玩意看了头疼。最近没有什么工作安排，所以准备探讨一番。\n## JS regExp\n#### 基本语法\nJS中有一个 regExp 对象，它表示正则表达式，可以对字符串执行强大的匹配功能。在 JS 中，正则表达式可以有两种表现语法：\n**字面量语法**\n```bash\n/pattern/attributes\n```\n**RegExp 对象的语法**\n```bash\nnew RegExp(pattern, attributes);\n```\n<!--more-->\n**参数**\n1、 参数 pattern 是一个字符串，指定了正则表达式的模式或其他正则表达式。\n2、 参数 attributes 是一个可选的字符串，包含属性 \"g\"、\"i\" 和 \"m\"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。\n\n在创建正则表达式时，如果不按照规范创建对象，很容易会导致错误。如 pattern 不规范：\n```bash\nnew RegExp(/me, \"g\");	//    不规范的表达式\n```\n又如 attributes 包含除\"m\",\"i\",\"g\"以外的字符\n```bash\nnew RegExp(/me/, \"o\");	//    不合法的属性\n```\n对于RegExp 对象的语法，如果给定 pattern 是完整正则表达式且带有合法属性参数时，不可再设置属性，如\n```bash\nnew RegExp(/me/g, \"i\");	//    Uncaught TypeError\nnew RegExp(/me/, \"i\");	//    Uncaught TypeError(即使 pattern 没有指定属性，但已有默认的属性值)\nnew RegExp(/me/gi);	//    /me/gi\n```\n#### 返回值\n当你要使用 RegExp 对象的时候，你会发现 RegExp 对象的返回值就是该正则表达式的字面量形式，二者的作用是完全等同的，但不完全等同，这里说的只是“作用”。为什么不完全等同呢？当你要创建一个正则表达式对象时，无论你用的是直接字面量形式还是创建 RegExp 对象形式，你所得到的都只是 RegExp 对象的一个实例，而对象的每一个实例都是不等同的。例如：\n```bash\nvar pattern1 = /me/g;\nvar pattern2 = /me/g;\nalert(pattern1==pattern2);	// false,用 RegExp 对象创建亦然\nalert(new RegExp(\"me\",\"g\")==new RegExp(\"me\",\"g\"));	// false\n```\n##### 当正则表达式实例遇上全局匹配\"g\"\n属性 \"g\" 是一个很有用的模式，它提供全局匹配可以让我们省很多事。但是它有一个特性：**对于同一个全局匹配的正则表达式实例，在实行一次（局部）匹配后，它下次匹配的起点会停留在本次匹配的尾部。**这是要怎么理解呢？上代码\n```bash\nvar p1 = /me/g;	// 全局匹配\"me\"字符串\nalert(p1.test(\"ome\"));	// true\nalert(p1.test(\"ome\"));	// false，这里为什么是false？？\nalert(p1.test(\"ome\"));	// true，又变回true了？\n```\n这里的表现很有趣，仿佛一个正则表达式加上 \"g\" 参数就变得如中二女青年一样“反复无常”，时而 true 时而 false。这是因为 RegExp 对象有一个 lastIndex 属性，它会记录上次匹配成功的位置。对于**同一个** RegExp 全局匹配实例来说，对于它的 lastIndex 可以解释如下：\n```bash\nvar p1 = /me/g;	// 全局匹配\"me\"字符串\nalert(p1.test(\"ome\"));	// true 这里匹配到 me 是位置3，lastIndex = 3，下次匹配就从位置3开始\nalert(p1.test(\"ome\"));	// false 但是位置3已经是字符串尾部，没能够再找到 me 了，所以返回 false\nalert(p1.test(\"ome\"));	// true 上次到了字符串的尾部，现在就从新开始，lastIndex = 0\n```\n上面的解析已经足够清楚，但是为了验证其正确性，不妨再看看：\n```bash\nvar p1 = /me/g;	// 全局匹配\"me\"字符串\nalert(p1.test(\"ome\"));	// true 这里匹配到 me 是位置3，下次匹配就从位置3开始\nalert(p1.test(\"omeooome\"));	// true 从位置3开始寻找下一个 me ，尾部可以找到一个 me，所以返回 true\n```\n细心的人可能看到我在上面给“同一个”着重加粗了，原因我想已经很显然了。对于功能相同但不等同的 RegExp 对象实例，\"g\" 所引起的小坑就不存在了。如下代码：\n```bash\nvar p1 = /me/g;	// 全局匹配\"me\"字符串\nalert(p1.test(\"ome\"));	// true\np1 = /me/g;\nalert(p1.test(\"ome\"));	// true\n```\n这里可能需要解释下，当 p1 被重新赋值后，哪怕是一模一样的内容，它也是 RegExp 对象的一个新的实例。\n\n### RegExp 对象方法\n#### exec() 方法\nexec() 方法用于检索字符串中的正则表达式的匹配。其语法为：\n```bash\nRegExpObject.exec(string)\n```\n执行该方法会返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。\n#### test() 方法\ntest() 方法用于检索字符串中的正则表达式的匹配。其语法为：\n```bash\nRegExpObject.test(string)\n```\n执行该方法会返回布尔值，如果找到匹配，则返回值为 true，否则为 false。\n#### compile() 方法\ncompile() 方法用于检索字符串中的正则表达式的匹配。其语法为：\n```bash\nRegExpObject.compile(string)\n```\n在当前浏览器环境中，我还真不知道这个东西有什么鬼用。文档是说：compile() 方法用于在脚本执行过程中编译，改变和重新编译正则表达式。\n\n### 支持正则表达式的 String 对象的方法\n#### search()\nsearch() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。\n**语法：**\n```bash\nstringObject.search(regexp)\n```\n执行该方法会返回 stringObject 中第一个与 regexp 相匹配的子串的起始位置。如果没有找到任何匹配的子串，则返回 -1。\n**注意**：search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex 属性，并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。\n#### match()\nmatch() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。\n**语法：**\n```bash\nstringObject.match(regexp)\n```\n执行该方法会返回存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。\n**注意**：\n如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。\n如果 regexp 具有标志 g，则 match() 方法将执行全局检索，找到 stringObject 中的所有匹配子字符串。若没有找到任何匹配的子串，则返回 null。如果找到了一个或多个匹配子串，则返回一个数组。不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中存放的是 stringObject 中所有的匹配子串，而且也没有 index 属性或 input 属性。\n#### replace()\nreplace() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。\n**语法：**\n```bash\nstringObject.replace(regexp/substr,replacement)\n```\n执行该方法会返回一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。\n#### split()\nsplit() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。\n**语法：**\n```bash\nstringObject.split(separator,howmany)\n```\nsplit() 方法用于把一个字符串分割成字符串数组。\n**注意**：\nseparator 是字符串或正则表达式，从该参数指定的地方分割 stringObject。\n\n### 总结\n说了那么多，总算是把 JS 正则表达式中最浅显的一层总结理解了一番，细细想想，这篇文章还没有考虑到“正则表达式基础知识”，“如何根据需求写正则表达式”，“子正则表达式”...................\n\n苍天啊！！\n大地啊！！');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '前端', '1');
INSERT INTO `category` VALUES ('2', '短笔记', '0');
INSERT INTO `category` VALUES ('3', '生活与读书', '0');

-- ----------------------------
-- Table structure for `developer`
-- ----------------------------
DROP TABLE IF EXISTS `developer`;
CREATE TABLE `developer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `token` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of developer
-- ----------------------------
INSERT INTO `developer` VALUES ('1', 'tanjiawei', 'wayne');

-- ----------------------------
-- Table structure for `tags`
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('12', 'javascript', '1');
INSERT INTO `tags` VALUES ('13', '正则', '1');
