#!/usr/bin/env node

_getAllLeavesInOneTreeNode = (retList, treeNode) => {
  if (!treeNode) {
    return retList;
  }
  if (!(treeNode.children && treeNode.children.length > 0)) {
    return retList.push(treeNode.topic);
  }
  const childList = treeNode.children;
  for(let i = 0; i < childList.length; i++) {
		_getAllLeavesInOneTreeNode(retList, childList[i]);
  }
  return retList;
}
  
getAllMindmapLeaves = (mindmapData) => { // Leaves: leaf plural
  let d = mindmapData;
  if (!(d && d.data && d.data.children && d.data.children.length > 0)) {
    return [];
  }
  const retList = [];
  const childList = d.data.children;
  for(let i = 0; i < childList.length; i++) {
    _getAllLeavesInOneTreeNode(retList, childList[i]);
  }
  return retList;
}

const mindmapData = {"id":"991d30d2824a4089","data":{"id":"root","level":0,"topic":"jsMind 介绍","children":[{"id":"5b35","level":1,"topic":"鼠标操作XXX","children":[{"id":"d27d","level":2,"topic":"单击: 选择节点","children":[{"id":"d974","level":3,"topic":"用 jsMind 的理由?","children":[{"id":"471a","level":4,"topic":"开源","children":[{"id":"1007","level":5,"topic":"添加同级节点","children":[],"expanded":true,"parentid":"471a"},{"id":"5ad8","level":5,"topic":"点小圆圈: 展开/收缩子节点","children":[],"expanded":true,"parentid":"471a"}],"expanded":true,"parentid":"d974"},{"id":"1405","level":4,"topic":"简洁","children":[],"expanded":true,"parentid":"d974"},{"id":"5e48","level":4,"topic":"一个浏览器足够","children":[],"expanded":true,"parentid":"d974"}],"expanded":true,"parentid":"d27d"}],"expanded":true,"parentid":"5b35"},{"id":"4c7d","note":"","image":"","level":2,"topic":"双击: 进入编辑模式，回车保存","children":[{"id":"991d32fd6a711e9b","note":"","image":"","level":3,"topic":"查看新文件","children":[],"expanded":true,"parentid":"4c7d","priority":""},{"id":"991d3623200f1194","note":"","image":"","level":3,"topic":"删除旧文件","children":[],"expanded":true,"parentid":"4c7d","priority":""}],"expanded":true,"parentid":"5b35","priority":""}],"expanded":true,"parentid":"root","direction":"right"},{"id":"0b5c","level":1,"topic":"键盘操作","children":[{"id":"f389","level":2,"topic":"Ctrl+Enter: 添加下级节点","children":[],"expanded":true,"parentid":"0b5c"},{"id":"1565","level":2,"topic":"Space: 展开/收缩子节点","children":[],"expanded":true,"parentid":"0b5c"}],"expanded":true,"parentid":"root","direction":"right"}],"expanded":true,"parentid":""},"meta":{"name":"jsMind remote","author":"QA+","version":"1.0"},"format":"node_tree"};
const mindmapData2 = {"id":"991e4fa2b7cb43da","data":{"id":"root","level":0,"topic":"jsMind介绍(简单版本)","children":[{"id":"5b35","note":"","image":"","level":1,"topic":"鼠标操作","children":[{"id":"d27d","note":"","image":"","level":2,"topic":"单击: 选择节点","children":[{"id":"991e45555685f17a","note":"","image":"","level":3,"topic":"添加同级节点","children":[],"expanded":true,"parentid":"d27d","priority":""}],"expanded":true,"parentid":"5b35","priority":""},{"id":"4c7d","note":"","image":"","level":2,"topic":"双击: 进入编辑模式，回车保存","children":[],"expanded":true,"parentid":"5b35","priority":""}],"expanded":true,"parentid":"root","priority":"","direction":"right"},{"id":"0b5c","level":1,"topic":"键盘操作","children":[{"id":"f389","level":2,"topic":"Ctrl+Enter: 添加下级节点","children":[],"expanded":true,"parentid":"0b5c"},{"id":"1565","level":2,"topic":"Space: 展开/收缩子节点","children":[],"expanded":true,"parentid":"0b5c"}],"expanded":true,"parentid":"root","direction":"right"}],"expanded":true,"parentid":""},"meta":{"name":"jsMind remote","author":"QA+","version":"1.0"},"format":"node_tree"};

const ret = getAllMindmapLeaves(mindmapData);
console.log(` ret = ${JSON.stringify(ret)}`);

const ret2 = getAllMindmapLeaves(mindmapData2);
console.log(`ret2 = ${JSON.stringify(ret2)}`);
