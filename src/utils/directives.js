import Vue from 'vue'
let that = new Vue();
let moveValue = undefined;
let dragBoxWidth = undefined;
let dragBoxHeight = undefined;
let dragBoxLeft = undefined;
let dragBoxTop = undefined;
let dragBoxWidth_1 = undefined;
let dragBoxHeight_1 = undefined;
let dragBoxLeft_1 = undefined;
let dragBoxTop_1 = undefined;
const directives = {
  updateData: {
    bind(el, binding, vnode) {
      console.log(el, binding, vnode);
    }
  },
  dragMove: {
    inserted(el, binding, vnode) { // 被绑定元素插入父节点时调用
      // console.log(el, binding, vnode);
      if (binding.value) {
        // 禁止选择网页上的文字
        document.onselectstart = () => {
          return false;
        };
        el.style = `cursor: move;`
        // 鼠标按下，计算当前元素距离可视区的距离
        el.onmousedown = (event) => {
          let dragBox = event.path.find(item=>{
            let i = item.id && binding.value && item.id.indexOf(binding.value);
            if (i === 0) {
              return item
            }
          })
          if (dragBox) {
            el.style = `cursor: move;`
            let divX = event.clientX - dragBox.offsetLeft;
            let divY = event.clientY - dragBox.offsetTop;
            document.onmousemove = (o) => {
              //通过事件委托，计算移动的距离
              let l = o.clientX - divX;
              let t = o.clientY - divY;
              //移动当前元素
              dragBox.style.left = l + "px";
              if (t >= 0) {
                dragBox.style.top = t + "px";
              }
              dragBoxWidth = dragBox.offsetWidth;
              dragBoxHeight = dragBox.offsetHeight;
              dragBoxLeft = dragBox.offsetLeft;
              dragBoxTop = dragBox.offsetTop;
            }
            document.onmouseup = (k) => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
            // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
            return false;
          }
        }
      } else {
        document.onselectstart = () => {
          return true;
        };
        el.style = `cursor: default;`
      }
    },
    update(el, binding, vnode) { // 被绑定元素模板更新时调用
      moveValue = binding.value;
      if (binding.value) {
        // 禁止选择网页上的文字
        document.onselectstart = () => {
          return false;
        };
        el.style = `cursor: move;`
        // 鼠标按下，计算当前元素距离可视区的距离
        el.onmousedown = (event) => {
          let dragBox = event.path.find(item=>{
            let i = item.id && moveValue && item.id.indexOf(moveValue);
            if (i === 0) {
              return item
            }
          })
          if (dragBox) {
            let divX = event.clientX - dragBox.offsetLeft;
            let divY = event.clientY - dragBox.offsetTop;
            document.onmousemove = (o) => {
              //通过事件委托，计算移动的距离
              let l = o.clientX - divX;
              let t = o.clientY - divY;
              //移动当前元素
              dragBox.style.left = l + "px";
              if (t >= 0) {
                dragBox.style.top = t + "px";
              }
              dragBoxWidth = dragBox.offsetWidth;
              dragBoxHeight = dragBox.offsetHeight;
              dragBoxLeft = dragBox.offsetLeft;
              dragBoxTop = dragBox.offsetTop;
            }
            document.onmouseup = (k) => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
            // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
            return false;
          }
        }
      } else {
        document.onselectstart = () => {
          return true;
        };
        el.style = `cursor: default;`
      }
    }
  },
  dragResize: {
    inserted(el, binding, vnode) { // 被绑定元素插入父节点时调用
      // console.log(el, binding, vnode);
      // let date = new Date().getFullYear();
      let bodyWidth = document.body.clientWidth;
      let bodyHeight = document.body.clientHeight;
      let kd = '5px'; // 每个div边框的宽度
      let jkd = '15px'; // 每个div角的宽度
      let jgd = '15px'; // 每个div角的高度
      let bk = 8; // 创建几个边框div
      let dragMinWidth = 300; // 拖拽框最小宽度
      let dragMinHeight = 200; // 拖拽框最小高度
      let dragWidth = el.offsetWidth; // 拖拽框初始宽度
      let dragHeight = el.offsetHeight; // 拖拽框初始高度
      let dragTime = 200; // 拖拽框拖动延迟的毫秒数
      let dragLeft = el.offsetLeft; // 拖拽框离左侧的距离
      let dragTop = el.offsetTop; // 拖拽框离上侧的距离
      let divArr = [];
      let idArr = [];
      el.style = `left: ${(bodyWidth - dragWidth) / 2}px; top: ${(bodyHeight - dragHeight) / 2}px`
      if (binding.value) {
        for (let i = 1 ; i <= bk; i++) {
          let div = document.createElement("div")
          divArr.push(div);
          idArr.push(`drag-resize border-${i}`);
        }
        idArr.forEach((item,index)=>{
          divArr[index].id = item;
          el.appendChild(divArr[index])
        })
        divArr.forEach((item,index)=>{
          if (index+1 == 1) {
            item.style = `position: absolute; width: 100%; height: ${kd}; left: 0; top: -5px; cursor:n-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let y = el.offsetTop;
              let box_h = el.offsetHeight;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let yy = o.clientY;
                let yyy = box_h + y - yy;
                if (yy >= 0) {
                  if (yyy > dragMinHeight || yy <= dragTop) {
                    setTimeout(() => {
                      el.style.height = yyy + 'px';
                      el.style.top = yy + 'px';
                    }, dragTime);
                  }
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 2) {
            item.style = `position: absolute; width: ${kd}; height: 100%; right: -5px; top: 0; cursor:w-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let x = e.clientX;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientWidth
                let xx = o.clientX;
                let xxx = box_w + xx - x;
                if (xx <= body && xxx >= dragMinWidth) {
                  setTimeout(() => {
                    el.style.width = xxx + 'px'
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 3) {
            item.style = `position: absolute; width: 100%; height: ${kd}; left: 0; bottom: -5px; cursor:n-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let y = e.clientY;
              let box_h = el.offsetHeight;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientWidth
                let yy = o.clientY;
                let yyy = box_h + yy - y;
                if (yy <= body && yyy >= dragMinHeight) {
                  setTimeout(() => {
                    el.style.height = yyy + 'px';
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 4) {
            item.style = `position: absolute; width: ${kd}; height: 100%; left: -5px; top: 0; cursor:w-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let x = el.offsetLeft;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let xx = o.clientX;
                if (xx >= 0) {
                  let xxx = box_w + x - xx;
                  if (xxx > dragMinWidth || xx <= dragLeft) {
                    setTimeout(() => {
                      el.style.width = xxx + 'px'
                      el.style.left = xx + 'px';
                    }, dragTime);
                  }
                  dragBoxWidth = el.offsetWidth;
                  dragBoxHeight = el.offsetHeight;
                  dragBoxLeft = el.offsetLeft;
                  dragBoxTop = el.offsetTop;
                }
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
  
          if (index+1 == 5) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; left: -5px; top: -5px; cursor:nw-resize;`
            let obj = {};
            item.onmousedown = (e) => {
              let x = el.offsetLeft;
              let y = el.offsetTop;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + y - yy;
                let xxx = box_w + x - xx;
                if (yy >= 0) {
                  if (yyy > dragMinHeight || yy <= dragTop) {
                    setTimeout(() => {
                      el.style.height = yyy + 'px';
                      el.style.top = yy + 'px';
                    }, dragTime);
                  }
                }
                if (xx >= 0) {
                  setTimeout(() => {
                    if (xxx > dragMinWidth || xx <= dragLeft) {
                      el.style.width = xxx + 'px'
                      el.style.left = xx + 'px';
                    }
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
                obj.x = k.pageX;
                obj.y = k.pageY;
              };
              return false;
            }
          }
          if (index+1 == 6) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; right: -5px; top: -5px; cursor:ne-resize;`
            item.onmousedown = (e) => {
              let x = e.clientX;
              let y = el.offsetTop;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientWidth
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + y - yy;
                let xxx = box_w + xx - x;
                if (yy >= 0) {
                  if (yyy > dragMinHeight) {
                    setTimeout(() => {
                      el.style.height = yyy + 'px';
                      el.style.top = yy + 'px';
                    }, dragTime);
                  }
                }
                if (xx <= body && xxx >= dragMinWidth) {
                  setTimeout(() => {
                    el.style.width = xxx + 'px'
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 7) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; right: -5px; bottom: -5px; cursor:nw-resize;`
            item.onmousedown = (e) => {
              let x = e.clientX;
              let y = e.clientY;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let bodyY = document.body.clientHeight
                let bodyX = document.body.clientWidth
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + yy - y;
                let xxx = box_w + xx - x;
                if (xx <= bodyX && xxx >= dragMinWidth) {
                  setTimeout(() => {
                    el.style.width = xxx + 'px'
                  }, dragTime);
                }
                if (yy <= bodyY && yyy >= dragMinHeight) {
                  setTimeout(() => {
                    el.style.height = yyy + 'px'
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 8) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; left: -5px; bottom: -5px; cursor:ne-resize;`
            item.onmousedown = (e) => {
              let x = el.offsetLeft;
              let y = e.clientY;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientHeight
                let offsetParentX = o.target.offsetParent ? o.target.offsetParent.offsetWidth : box_w;
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + yy - y;
                let xxx = box_w + x - xx;
                if (xx >= 0) {
                  if (xxx > dragMinWidth && offsetParentX > box_w) {
                    setTimeout(() => {
                      el.style.width = xxx + 'px'
                      el.style.left = xx + 'px';
                    }, dragTime);
                  }
                }
                if (yy <= body && yyy >= dragMinHeight) {
                  setTimeout(() => {
                    el.style.height = yyy + 'px';
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
        })
      }
      // el.style = `z-index: ${date};`
      // el.style = `position: absolute; transform: translateX(-${el.offsetWidth / 2}px);`
      // el.style = `position: absolute; left: ${dragLeft}; right: ${dragRight}; top: ${dragTop}; bottom: ${dragBottom}; min-width: ${dragMinWidth}; min-height: ${dragMinHeight};`
    },
    update(el, binding, vnode) { // 被绑定元素模板更新时调用
      // console.log(el, binding, vnode);
      // let date = new Date().getFullYear();
      let kd = '5px'; // 每个div边框的宽度
      let jkd = '15px'; // 每个div角的宽度
      let jgd = '15px'; // 每个div角的高度
      let bk = 8; // 创建几个边框div
      let dragMinWidth = 300; // 拖拽框最小宽度
      let dragMinHeight = 200; // 拖拽框最小高度
      let dragTime = 200; // 拖拽框拖动延迟的毫秒数
      let dragLeft = el.offsetLeft; // 拖拽框离左侧的距离
      let dragTop = el.offsetTop; // 拖拽框离上侧的距离
      let divArr = [];
      let idArr = [];
      if (binding.value) {
        for (let i = 1 ; i <= bk; i++) {
          let div = document.createElement("div")
          divArr.push(div);
          idArr.push(`drag-resize border-${i}`);
        }
        idArr.forEach((item,index)=>{
          divArr[index].id = item;
          el.appendChild(divArr[index])
        })
        divArr.forEach((item,index)=>{
          if (index+1 == 1) {
            item.style = `position: absolute; width: 100%; height: ${kd}; left: 0; top: -5px; cursor:n-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let y = el.offsetTop;
              let box_h = el.offsetHeight;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let yy = o.clientY;
                let yyy = box_h + y - yy;
                if (yy >= 0) {
                  if (yyy > dragMinHeight || yy <= dragTop) {
                    setTimeout(() => {
                      el.style.height = yyy + 'px';
                      el.style.top = yy + 'px';
                    }, dragTime);
                  }
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 2) {
            item.style = `position: absolute; width: ${kd}; height: 100%; right: -5px; top: 0; cursor:w-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let x = e.clientX;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientWidth
                let xx = o.clientX;
                let xxx = box_w + xx - x;
                if (xx <= body && xxx >= dragMinWidth) {
                  setTimeout(() => {
                    el.style.width = xxx + 'px'
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 3) {
            item.style = `position: absolute; width: 100%; height: ${kd}; left: 0; bottom: -5px; cursor:n-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let y = e.clientY;
              let box_h = el.offsetHeight;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientWidth
                let yy = o.clientY;
                let yyy = box_h + yy - y;
                if (yy <= body && yyy >= dragMinHeight) {
                  setTimeout(() => {
                    el.style.height = yyy + 'px';
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 4) {
            item.style = `position: absolute; width: ${kd}; height: 100%; left: -5px; top: 0; cursor:w-resize;`
            // 鼠标按下，计算当前元素距离可视区的距离
            item.onmousedown = (e) => {
              let x = el.offsetLeft;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let xx = o.clientX;
                if (xx >= 0) {
                  let xxx = box_w + x - xx;
                  if (xxx > dragMinWidth || xx <= dragLeft) {
                    setTimeout(() => {
                      el.style.width = xxx + 'px'
                      el.style.left = xx + 'px';
                    }, dragTime);
                  }
                  dragBoxWidth = el.offsetWidth;
                  dragBoxHeight = el.offsetHeight;
                  dragBoxLeft = el.offsetLeft;
                  dragBoxTop = el.offsetTop;
                }
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
  
          if (index+1 == 5) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; left: -5px; top: -5px; cursor:nw-resize;`
            let obj = {};
            item.onmousedown = (e) => {
              let x = el.offsetLeft;
              let y = el.offsetTop;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + y - yy;
                let xxx = box_w + x - xx;
                if (yy >= 0) {
                  if (yyy > dragMinHeight || yy <= dragTop) {
                    setTimeout(() => {
                      el.style.height = yyy + 'px';
                      el.style.top = yy + 'px';
                    }, dragTime);
                  }
                }
                if (xx >= 0) {
                  setTimeout(() => {
                    if (xxx > dragMinWidth || xx <= dragLeft) {
                      el.style.width = xxx + 'px'
                      el.style.left = xx + 'px';
                    }
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
                obj.x = k.pageX;
                obj.y = k.pageY;
              };
              return false;
            }
          }
          if (index+1 == 6) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; right: -5px; top: -5px; cursor:ne-resize;`
            item.onmousedown = (e) => {
              let x = e.clientX;
              let y = el.offsetTop;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientWidth
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + y - yy;
                let xxx = box_w + xx - x;
                if (yy >= 0) {
                  if (yyy > dragMinHeight) {
                    setTimeout(() => {
                      el.style.height = yyy + 'px';
                      el.style.top = yy + 'px';
                    }, dragTime);
                  }
                }
                if (xx <= body && xxx >= dragMinWidth) {
                  setTimeout(() => {
                    el.style.width = xxx + 'px'
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 7) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; right: -5px; bottom: -5px; cursor:nw-resize;`
            item.onmousedown = (e) => {
              let x = e.clientX;
              let y = e.clientY;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let bodyY = document.body.clientHeight
                let bodyX = document.body.clientWidth
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + yy - y;
                let xxx = box_w + xx - x;
                if (xx <= bodyX && xxx >= dragMinWidth) {
                  setTimeout(() => {
                    el.style.width = xxx + 'px'
                  }, dragTime);
                }
                if (yy <= bodyY && yyy >= dragMinHeight) {
                  setTimeout(() => {
                    el.style.height = yyy + 'px'
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
          if (index+1 == 8) {
            item.style = `position: absolute; width: ${jkd}; height: ${jgd}; left: -5px; bottom: -5px; cursor:ne-resize;`
            item.onmousedown = (e) => {
              let x = el.offsetLeft;
              let y = e.clientY;
              let box_h = el.offsetHeight;
              let box_w = el.offsetWidth;
              // 禁止选择网页上的文字
              document.onselectstart = () => {
                return false;
              };
              // 鼠标移动
              document.onmousemove = (o) => {
                let body = document.body.clientHeight
                let offsetParentX = o.target.offsetParent ? o.target.offsetParent.offsetWidth : box_w;
                let yy = o.clientY;
                let xx = o.clientX;
                let yyy = box_h + yy - y;
                let xxx = box_w + x - xx;
                if (xx >= 0) {
                  if (xxx > dragMinWidth && offsetParentX > box_w) {
                    setTimeout(() => {
                      el.style.width = xxx + 'px'
                      el.style.left = xx + 'px';
                    }, dragTime);
                  }
                }
                if (yy <= body && yyy >= dragMinHeight) {
                  setTimeout(() => {
                    el.style.height = yyy + 'px';
                  }, dragTime);
                }
                dragBoxWidth = el.offsetWidth;
                dragBoxHeight = el.offsetHeight;
                dragBoxLeft = el.offsetLeft;
                dragBoxTop = el.offsetTop;
              }
              document.onmouseup = (k) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
              return false;
            }
          }
        })
      } else {
        document.onselectstart = () => {
          return true;
        };
        let arr = [];
        el.children.forEach(item=>{
          if (item.id.indexOf("drag-resize") !== -1) {
            arr.push(item)
          }
        })
        arr.forEach((item)=>{
          el.removeChild(item)
        })
      }
      // el.style = `z-index: ${date};`
      // el.style = `position: absolute; transform: translateX(-${el.offsetWidth / 2}px);`
      // el.style = `position: absolute; left: ${dragLeft}; right: ${dragRight}; top: ${dragTop}; bottom: ${dragBottom}; min-width: ${dragMinWidth}; min-height: ${dragMinHeight};`
    },
  },
  dragMax: {
    inserted(el, binding, vnode) { // 被绑定元素插入父节点时调用
      // console.log(el, binding, vnode);
      let dragBox = {};
      let dragTime = 200; // 拖拽框放大延迟的毫秒数
      vnode.context.$el.childNodes.forEach(item=>{
        let i = item.id && binding.value && item.id.indexOf(binding.value);
        if (i === 0) {
          dragBox = item
        }
      })
      setTimeout(() => {
        dragBoxWidth = dragBoxWidth ? dragBoxWidth : dragBox.offsetWidth;
        dragBoxHeight = dragBoxHeight ? dragBoxHeight : dragBox.offsetHeight;
        dragBoxLeft = dragBoxLeft ? dragBoxLeft : dragBox.offsetLeft;
        dragBoxTop = dragBoxTop ? dragBoxTop : dragBox.offsetTop;
      }, 200);
      el.style = `width: 10px; height: 10px; border: 1px solid #879290; margin: 0 10px; cursor: pointer;`
      el.onmousedown = (event) => {
        let body = document.body.clientWidth;
        let drag_box = event.path.find(item=>{
          let i = item.id && binding.value && item.id.indexOf(binding.value);
          if (i === 0) {
            return item
          }
        })
        if (drag_box.offsetWidth == body && drag_box.offsetTop == 0) {
          setTimeout(() => {
            el.className = "el-icon-border"
            el.style = `width: 10px; height: 10px; border: 1px solid #879290; margin: 0 10px; cursor: pointer;`
            drag_box.style = `left: ${dragBoxLeft}px; width: ${dragBoxWidth}px; top: ${dragBoxTop}px; height: ${dragBoxHeight}px;`
          }, dragTime);
          dragBoxWidth_1 = undefined;
          dragBoxHeight_1 = undefined;
          dragBoxLeft_1 = undefined;
          dragBoxTop_1 = undefined;
        } else {
          setTimeout(() => {
            el.className = "el-icon-copy-document"
            el.style = `border: none; margin: 0 10px; cursor: pointer;`
            drag_box.style = `left: 0px; width: 100%; top: 0px; height: 100%;`
          }, dragTime);
          dragBoxWidth_1 = drag_box.offsetWidth;
          dragBoxHeight_1 = drag_box.offsetHeight;
          dragBoxLeft_1 = drag_box.offsetLeft;
          dragBoxTop_1 = drag_box.offsetTop;
        }
      }
    }
  },
  dragMin: {
    inserted(el, binding, vnode) { // 被绑定元素插入父节点时调用
      // console.log(el, binding, vnode);
      let date = new Date().getFullYear();
      el.style = `cursor: pointer;`
      el.onmousedown = (event) => {
        let dragBox = event.path.find(item=>{
          let i = item.id && binding.value && item.id.indexOf(binding.value);
          if (i === 0) {
            return item
          }
        })
        dragBox.style = "left: -1000px; top: -1000px;"
        let div = document.createElement("div");
        let icon = document.createElement("i");
        div.id = "drag-min-box";
        div.className = "flex-align-center";
        icon.className = "el-icon-full-screen";
        div.appendChild(icon);
        vnode.context.$el.appendChild(div);
        icon.style = `cursor: pointer; font-size: 20px;`;
        div.style = `position: absolute; right: 10px; top: 10px; width: 50px; height: 50px; z-index: ${date}; border-radius: 5px; background: #e9e9e9;`
        icon.addEventListener("click", () => {
          vnode.context.$el.removeChild(div);
          dragBox.style = `left: ${dragBoxLeft_1  === 0 ? dragBoxLeft_1 : dragBoxLeft}px; width: ${dragBoxWidth_1 ? dragBoxWidth_1 : dragBoxWidth}px; top: ${dragBoxTop_1 === 0 ? dragBoxTop_1 : dragBoxTop}px; height: ${dragBoxHeight_1 ? dragBoxHeight_1 : dragBoxHeight}px;`
        })
      }
    }
  },
  dragClose: {
    inserted(el, binding, vnode) { // 被绑定元素插入父节点时调用
      // console.log(el, binding, vnode);
      let fun = '[object Function]';
      el.style = `cursor: pointer;`
      el.onclick = (event) => {
        moveValue = undefined;
        dragBoxWidth = undefined;
        dragBoxHeight = undefined;  
        dragBoxLeft = undefined;
        dragBoxTop = undefined;
        // 判断指令中是否绑定了函数
        let type = Object.prototype.toString.call(binding.value);
        if (type == fun) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是那个函数
          binding.value(el, binding, vnode, event)
        } else {
          vnode.context.$el.removeChild(dragBox)
        }
      }
    }
  },
  del: {
    inserted(el, binding, vnode) { // 被绑定元素插入父节点时调用
      let arr = '[object Array]';
      let obj = '[object Object]';
      let fun = '[object Function]';
      let str = '[object String]';
      let num = '[object Number]';
      // let boo = '[object Boolean]';
      if (binding.value) {
        let type = Object.prototype.toString.call(binding.value);
        if (type == arr) {
          let flag = binding.value.some(item=>{
            return checkArray(item);
          })
          if (flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
        if (type == obj) {
          let roleArr = Object.keys(binding.value);
          let flag = roleArr.some(item=>{
            return checkArray(binding.value[item]);
          })
          if (flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
        if (type == str || type == num) {
          let roleArr = binding.value.split(",");
          let flag = roleArr.some(item=>{
            return checkArray(item);
          })
          if (flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
        if (type == fun) {
          let value = binding.value();
          let type1 = Object.prototype.toString.call(value);
          if (type1 == arr) {
            let flag = value.some(item=>{
              return checkArray(item);
            })
            if (flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
              el.parentNode && el.parentNode.removeChild(el)
            }
          }
          if (type1 == obj) {
            let roleArr = Object.keys(value);
            let flag = roleArr.some(item=>{
              return checkArray(value[item]);
            })
            if (flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
              el.parentNode && el.parentNode.removeChild(el)
            }
          }
          if (type1 == str || type1 == num) {
            let flag = checkArray(value);
            if (flag) { // 判断是否有权限，没有权限就删除元素，等同于v-if指令
              el.parentNode && el.parentNode.removeChild(el)
            }
          }
        }
        if (type == boo) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        // el.style = "display: none;"
        el.parentNode && el.parentNode.removeChild(el)
      }
      // // 判断指令中是否绑定了函数
      // if (binding.exptypesion) {
      //   // 如果绑定了函数 则调用那个函数，此处binding.value就是那个函数
      //   binding.value(el, binding, vnode);
      // }
    }
  },
}
function checkArray(key) {
  let arr = ['zd', 'dd'];
  let index = arr.indexOf(key);
  return index !== -1 ? true : false;
}
let authority = {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
Vue.use(authority);
export default authority