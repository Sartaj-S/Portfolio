'use strict'

function drawGrabber (x, y) {
  const size = 5
  const canvas = document.getElementById('graphpanel')
  const ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function createCircleNode (x, y, size, color) {
  return {
    clone: (mousePoint) => {
      return createCircleNode(mousePoint.x, mousePoint.y, size, color)
    },
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },
    getProperties: () => {
      let properties = []
      properties.push('Color')
      properties.push('Size')
      return properties
    },
    getPropertyValues: () => {
      let propertyVals = []
      propertyVals.push(color)
      propertyVals.push(size)
      return propertyVals
    },
    getPropertyMods: () => {
      let propMods = []
      propMods.push(changeCircleColor)
      propMods.push(changeCircleSize)
      return propMods
    },
    contains: p => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    translate: (dx, dy) => {
      // if (y + dy >= 50) {
      x += dx
      y += dy
      // }
    },
    getColor: () => {
      return color
    },
    changeColor (newColor) {
      color = newColor
    },
    draw () {
      const container = document.getElementById('nodeContainer')
      const table = document.createElement('table')
      const tr = document.createElement('tr')
      const td = document.createElement('td')
      table.appendChild(tr)
      tr.appendChild(td)
      table.style.position = 'absolute'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = size + 'px'
      table.style.height = size + 'px'
      table.style.background = color
      container.appendChild(table)
    },
    getType: () => {
      return 'parent'
    },
    getSize: () => {
      return size
    },
    changeSize (newSize) {
      size = newSize
    },
    drawTool (container) {
      const table = document.createElement('table')
      const tr = document.createElement('tr')
      const td = document.createElement('td')
      table.appendChild(tr)
      tr.appendChild(td)
      table.style.position = 'absolute'

      table.style.justifySelf = 'center'
      table.style.width = '100%'
      table.style.height = '100%'
      table.style.background = color
      container.appendChild(table)
    }
  }
}

function changeCircleColor (circle, newColor, i) {
  circle.changeColor(newColor)
  // i not needed for circles
}
function changeCircleSize (circle, newSize, i) {
  circle.changeSize(newSize)
  // i not needed for circles
}

function createRectangleNode (x, y, width1, height1) {
  let array = []
  let text = ''
  let maxWidth
  let maxHeight 
  return {
    updateSize: () => {
      let rect = getClientRect(table.id)
      width = rect.width
      height = rect.height
    },
    clone: (mousePoint) => {
      return createRectangleNode(mousePoint.x, mousePoint.y, width1, height1)
    },
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width1+50,
        height: height1+30
      }
    },
    contains: p => {
      return (x + width1 / 2 - p.x) ** 2 + (y + width1 / 2 - p.y) ** 2 <= width1 ** 2 / 4
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    editText: (newText) => {
      text = newText
    },
    addChild: (newChild) => {
      array.push(newChild)
    },
    getChild: i => {
      return array[i]
    },
    getProperties: () => {
      let properties = []
      properties.push('text')
      for (let i = 0; i < array.length; i++) {
        properties.push('name ' + i)
        properties.push('value ' + i)
      }
      return properties
    },
    getPropertyValues: () => {
      let propertyVals = []
      propertyVals.push(text)
      for (let i = 0; i < array.length; i++) {
        propertyVals.push(array[i].getName())
        propertyVals.push(array[i].getValue())
      }
      return propertyVals
    },
    getPropertyMods: () => {
      let propMods = []
      propMods.push(changeRectText)
      for (let i = 0; i < array.length; i++) {
        propMods.push(changeRectName)
        propMods.push(changeRectValue)
      }
      return propMods
    },
    deleteChild: (idDelete) => {
      let position = 0
      for (let i = 0; i < array.length; i++) {
        if (array[i].getId === idDelete) {
          position = i
        }
      }
    },
    draw () {
      if (array.length !== 0) {
        for (let i = 0; i < array.length; i++) {
          array[i].draw()
        }
      }
      const container = document.getElementById('nodeContainer')
      const table = document.createElement('table')
      table.setAttribute('id', 'rectTable')
      var tblBody = document.createElement('tbody')
      var tr = document.createElement('tr')
      var td = document.createElement('td')
      const tempText = document.createTextNode(text)
      td.appendChild(tempText)
      tr.appendChild(td)
      table.appendChild(tr)
      if (array.length !== 0) {
        for (let i = 0; i < array.length; i++) {
          var temptr = document.createElement('tr')
          var temptd = document.createElement('td')
          temptr.appendChild(document.getElementById(array[i].getId()).firstElementChild)
          table.append(temptr)
          width1+=temptr.clientWidth
          
        }
      } else {
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        tr.appendChild(td)
        table.appendChild(tr)
      }
      table.style.position = 'absolute'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width1+50 + td.width + 'px'
      table.style.height = height1+30 + td.height + 'px'
    
      container.appendChild(table)
     // maxWidth=container.clientWidth
      
      table.style.borderStyle='solid'
      //maxWidth=width1+50 + td.width + 'px'
      //maxHeight=height1+30 + td.height + 'px'
     // heigth1 += table.clientHeight
    },
    drawTool (container) {
      if (array.length !== 0) {
        for (let i = 0; i < array.length; i++) {
          array[i].draw()
        }
      }
      const table = document.createElement('table')
      table.setAttribute('id', 'rectTable')
      var tblBody = document.createElement('tbody')

      var tr = document.createElement('tr')
      var td = document.createElement('td')
      const tempText = document.createTextNode(text)
      td.appendChild(tempText)
      tr.appendChild(td)
      table.appendChild(tr)
      if (array.length !== 0) {
        for (let i = 0; i < array.length; i++) {
          var temptr = document.createElement('tr')
          var temptd = document.createElement('td')
          temptr.appendChild(document.getElementById(array[i].getId()).firstElementChild)
          table.append(temptr)
        }
      } else {
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        tr.appendChild(td)
        table.appendChild(tr)
      }
      table.style.position = 'absolute'
      table.style.bottom = '25%'
      table.style.width = width1 + td.width + 'px'
      table.style.height = height1 + td.height + 'px'
      
      table.style.borderStyle = 'solid'
      //table.style.border='black'
      
      container.appendChild(table)
     
    },
    getType: () => {
      return 'parent'
    }
  }
}

function changeRectName (rect, newName, x) {
  x = (x - 1) * 0.5 // ith field node in rect.array
  rect.getChild(x).modifyName(newName)
}
function changeRectValue (rect, newValue, y) {
  y = (0.5 * y) - 1
  rect.getChild(y).modifyValue(newValue)
}
function changeRectText (rect, newText, i) {
  rect.editText(newText)
}

function createNoteNode (x, y, width1, height1) {
  let text = ''
  let width = 0
  let height = 0
  return {
    clone: (mousePoint) => {
      return createNoteNode(mousePoint.x, mousePoint.y, width1, height1)
    },
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width1,
        height: height1
      }
    },
    contains: p => {
      return (x + width1 / 2 - p.x) ** 2 + (y + width1 / 2 - p.y) ** 2 <= width1 ** 2 / 4
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    editText: (textEntry) => {
      text = textEntry
    },
    getProperties: () => {
      let properties = []
      properties.push('Text')
      return properties
    },
    getPropertyValues: () => {
      let propertyVals = []
      propertyVals.push(text)
      return propertyVals
    },
    getPropertyMods: () => {
      let propMods = []
      propMods.push(changeNoteText)
      return propMods
    },
    draw () {
      const container = document.getElementById('nodeContainer')
      const table = document.createElement('table')
      const tr = document.createElement('tr')
      const td = document.createElement('td')

      table.appendChild(tr)
      tr.appendChild(td)
      const tempText = document.createTextNode(text)
      td.appendChild(tempText)
      table.style.position = 'absolute'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width1 + td.width + 'px'
      width = width1 + td.clientWidth + 'px'
      height = height1 + td.clientHeight + 'px'
      table.style.height = height1 + td.height + 'px'
      table.style.background = 'yellow'
      container.appendChild(table)
    },
    getType: () => {
      return 'parent'
    },
    drawTool (container) {
      const table = document.createElement('table')
      const tr = document.createElement('tr')
      const td = document.createElement('td')
      table.appendChild(tr)
      tr.appendChild(td)
      table.style.position = 'absolute'
      table.style.left = '45%'
      table.style.top = '35%'
      table.style.width = width1 + 'px'
      table.style.height = height1 + 'px'
      table.style.background = 'yellow'
      container.appendChild(table)
    }
  }
}
function changeNoteText (note, newText, i) {
  note.editText(newText)
  // i not needed for note node
}
function createFieldNode (x, y, width1, height1, idNew) {
  let name = 'name'
  let value = 'value'
  let id = idNew
  let count 
  return {
    clone: (mousePoint) => {
      count++
      return createFieldNode(mousePoint.x, mousePoint.y, width1, height1, 'idNew' + count)
    },
    getId: () => {  
      return  id
    },
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width1,
        height: height1
      }
    },
    contains: p => {
      return (x + width1 / 2 - p.x) ** 2 + (y + width1 / 2 - p.y) ** 2 <= width1 ** 2 / 4
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    modifyName: (newName) => {
      name = newName
    },
    getName: () => {
      let temp = name
      return temp
    },
    getValue: () => {
      let temp = value
      return value
    },

    setId: (theId) => {
      id=theId
    },
    modifyValue: (newValue) => {
      value=newValue
    },
    draw () {
      const container = document.getElementById('nodeContainer')
      const table = document.createElement('table')
      var tblBody = document.createElement('tbody')
      var tr = document.createElement('tr')
      var td = document.createElement('td')
      var td2 = document.createElement('td')
      var td3 = document.createElement('td')
      const tempText = document.createTextNode(name)
      const text2 = document.createTextNode('=')
      const text3 = document.createTextNode(value)

      td.appendChild(tempText)
      td2.appendChild(text2)
      td3.appendChild(text3)

      td.width = tempText.length
      tr.appendChild(td)
      tr.appendChild(td2)
      tr.appendChild(td3)
      table.appendChild(tr)
      id = idNew
      table.setAttribute('id', id)
      table.style.position = 'absolute'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width1 + td.width + 'px'
      table.style.height = height1 + (td.height * td.width) + 'px'
      table.style.background = 'white'
      container.appendChild(table)
    },
    drawTool (container) {
      const table = document.createElement('table')
      const tr = document.createElement('tr')
      const td = document.createElement('td')
      table.appendChild(tr)
      tr.appendChild(td)
      table.style.position = 'absolute'
      table.style.left = '45%'
      table.style.top = '35%'
      table.style.width = size + 'px'
      table.style.height = size + 'px'
      table.style.background = 'blacl'
      container.appendChild(table)
    },
    getType: () => {
      return 'child'
    }
  }
}
function createToolBar () {
  let nodes = []
  let selection
  return {
    draw: () => {
      const container = document.getElementById('toolContainer')
      for (let i = 0; i < nodes.length; i++) {
        const toolCapsule = document.createElement('div')
        const toolDiv = document.createElement('div')
        toolDiv.id = 'div' + i
        const toolCanv = document.createElement('canvas')
        toolDiv.className = 'toolDiv'
        toolCanv.className = 'toolCanv'
        toolCapsule.className = 'toolCaps'
        toolDiv.appendChild(toolCanv)
        toolCapsule.appendChild(toolDiv)
        container.appendChild(toolCapsule)
        if (nodes[i].getType() === 'parent') {
          nodes[i].drawTool(toolDiv)
        } else if (nodes[i].getType() === 'edge') {
          nodes[i].drawTool(toolCanv)
        }
      }
    },
    add: (n) => {
      nodes.push(n)
    },
    findNode: (p) => {
      for (const n of nodes) {
        if (n.contains(p)) return n
      }
      return undefined
    },
    changeSelection: (selected) => {
      for (let i = 0; i < nodes.length; i++) {
        let tempDiv = document.getElementById('div' + i)
        tempDiv.style.background = 'rgb(211,211,211)'
      }
      let id = nodes.indexOf(selected)
      let tempDiv = document.getElementById('div' + id)
      tempDiv.style.background = 'rgb(99, 99, 99)'
      selection = selected
    },
    getSelection: () => {
      return selection
    },
    getNodes: () => {
      return nodes
    }
  }
}

class Graph {
  constructor () {
    this.nodes = []
    this.edges = []
  }
  add (n) {
    this.nodes.push(n)
  }
  findNode (p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }
  draw () {
    for (const n of this.nodes) {
      n.draw()
    }
    for (const e of this.edges) {
      e.draw()
    }
  }

  connect (e, p1, p2) {
    const n1 = p1
    const n2 = p2
    if (n1 !== undefined && n2 !== undefined) {
      e.connect(n1, n2)
      this.edges.push(e)
      return true
    }
    return false
  }
}
function center (rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

function createDottedLineEdge () {
  let start
  let end
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      // Just pick the center of the bounds for now
      const p = center(start.getBounds())
      // Not the "connection points" that graphed2 uses
      const q = center(end.getBounds())
      ctx.setLineDash([6, 9])
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(q.x, q.y)
      ctx.stroke()
    },
    getType: () => {
      return 'edge'
    },
    drawTool: (canvas) => {
      const ctx = canvas.getContext('2d')
      ctx.transform(0.5, 0, 0, 0.5, 0, 0)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      ctx.lineTo(canvas.width, 0)
      ctx.stroke()
    },
    contains: (p) => {
    },
    clone: () => {
      return createDottedLineEdge()
    }
  }
}

function createCurvedLineEdge() {
  let start
  let end
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      // Just pick the center of the bounds for now
      const p = center(start.getBounds())
      // Not the "connection points" that graphed2 uses
      const q = center(end.getBounds())
      ctx.moveTo(p.x, p.y)
      ctx.bezierCurveTo(p.x + 50, p.y + 50, q.x - 50, q.y - 50, q.x, q.y);
      ctx.stroke()
    },
    getType: () => {
      return 'edge'
    },
    drawTool: (canvas) => {
      const ctx = canvas.getContext('2d')
      ctx.transform(0.5, 0, 0, 0.5, 0, 0)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      ctx.lineTo(canvas.width, 0)
      ctx.stroke()
    },
    contains: (p) => {
    },
    clone: () => {
      return createCurvedLineEdge()
    }
  }
}

function createLineEdge () {
  let start
  let end
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      // Just pick the center of the bounds for now
      const p = center(start.getBounds())
      // Not the "connection points" that graphed2 uses
      const q = center(end.getBounds())
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(q.x, q.y)
      ctx.stroke()
    },
    getType: () => {
      return 'edge'
    },
    drawTool: (canvas) => {
      const ctx = canvas.getContext('2d')
      ctx.transform(0.5, 0, 0, 0.5, 0, 0)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      ctx.lineTo(canvas.width, 0)
      ctx.stroke()
    },
    contains: (p) => {
    },
    clone: () => {
      return createLineEdge()
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  //  ADDING TOOLS
  const text1 = createFieldNode(10, 150, 30, 20, 'tableonethousand')
  const dottedEdge = createDottedLineEdge()
  const curvedEdge = createCurvedLineEdge()
  const lineEdge = createLineEdge()
  const note1 = createNoteNode(50, 50, 50, 50)
  const rect1 = createRectangleNode(10, 20, 30, 20)
  const tools = createToolBar()
  // 
  tools.add(rect1)
  tools.add(dottedEdge)
  tools.add(curvedEdge)
  tools.add(lineEdge)
  tools.add(text1)
  tools.add(note1)
  graph.draw()
  tools.draw()
  let nodes = tools.getNodes()
  for (let i = 0; i < nodes.length; i++) {
    const toolDiv = document.getElementById('div' + i)
    toolDiv.addEventListener('click', () => tools.changeSelection(nodes[i]))
  }
  const panel = document.getElementById('graphpanel')
  let selected
  let dragStartPoint
  let dragStartBounds
  let startNode
  let endNode

  let propNameArr = []
  let setterFunc = []

  function repaint () {
    const container = document.getElementById('nodeContainer')
    const canvas = document.getElementById('graphpanel')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    container.innerHTML = ''
    graph.draw()
    // tools.draw()
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }
  }
  function mouseLocation (event) {
    var rect = panel.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  function applyButton () {
    for (let i = 0; i < propNameArr.length; i++) {
      let newVal = document.getElementById(propNameArr[i]).value
      setterFunc[i](selected, newVal, i)
      repaint()
    }
  }

  panel.addEventListener('mousedown', event => {
    const mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    startNode = selected
    if (selected !== undefined && tools.getSelection().getType() === 'child') {
      let selection = tools.getSelection()
      selected.addChild(selection.clone(mousePoint))
    } else if (selected !== undefined) {
      dragStartPoint = mousePoint
      dragStartBounds = selected.getBounds()
    } else if (tools.getSelection().getType() === 'parent') {
      let selection = tools.getSelection()
      const temp = selection.clone(mousePoint)
      graph.add(temp)
    } else if (tools.getSelection().getType() === 'edge') {
      startNode = selected
    }
    // removing propertysheet when user clicks elsewhere
    var myNode = document.getElementById('propertySheet')
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild)
    }
    repaint()
  })
  panel.addEventListener('dblclick', event => { // property sheet eventlistener
    // for when you doubleclick a node
    const mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    if (selected !== undefined) { 
      propNameArr = selected.getProperties()
      let y = selected.getPropertyValues()
      setterFunc = selected.getPropertyMods()
      
      var table = document.createElement('TABLE')
      table.setAttribute('id', 'propTable')
      document.getElementById('propertySheet').appendChild(table)
      for (let i = 0; i < propNameArr.length; i++) {
        let propName = propNameArr[i]
        let currVal = y[i]
        let propSetter = setterFunc[i]
        let rowID = propName + i
        // make row
        var row1 = document.createElement('TR')
        row1.setAttribute('id', rowID)
        document.getElementById('propTable').appendChild(row1)

        // creating descriptor
        var p = document.createElement('p')
        var textnode = document.createTextNode(propName)
        p.appendChild(textnode)

        // make first column
        var col1 = document.createElement('TD')
        col1.appendChild(p)
        document.getElementById(rowID).appendChild(col1)
        // creating textbox
        var sBox = document.createElement('input')
        sBox.setAttribute('type', 'text')
        sBox.setAttribute('id', propName)
        sBox.setAttribute('value', currVal)
        sBox.addEventListener('keydown', applyButton)
        sBox.addEventListener('keyup', applyButton)
        // make second column
        var col2 = document.createElement('TD')
        col2.appendChild(sBox)
        document.getElementById(rowID).appendChild(col2)
      }
    }
  })
  panel.addEventListener('mousemove', event => {
    if (dragStartPoint === undefined) return
    let mousePoint = mouseLocation(event)
    if (selected !== undefined && tools.getSelection().getType() !== 'edge') {
      const bounds = selected.getBounds()
      selected.translate(
        dragStartBounds.x - bounds.x +
        mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y +
        mousePoint.y - dragStartPoint.y)
      repaint()
    }
  })

  
  panel.addEventListener('mouseup', event => {
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    if (selected !== undefined && selected !== startNode && tools.getSelection().getType() === 'edge') {
      endNode = selected
      graph.connect(tools.getSelection().clone(), startNode, endNode)
    }
    dragStartPoint = undefined
    dragStartBounds = undefined
    repaint()
  })

  // canvas vars
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
function reOffset(){
    var BB=canvas.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;        
}
var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }

// dragging vars
var isDown=false;
var startX,startY;

// line vars
var nearest;
var lines=[];
lines.push({x0:75, y0:25, x1:125,y1:25});
lines.push({x0:75, y0:100, x1:125, y1:100});
lines.push({x0:50, y0:35, x1:50,y1:85});
lines.push({x0:150,y0:35, x1:150,y1:85});

draw();

// listen for mouse events
$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUpOut(e);});
$("#canvas").mouseout(function(e){handleMouseUpOut(e);});


// functions //////////////////////////

// select the nearest line to the mouse
function closestLine(mx,my){
    var dist=100000000;
    var index,pt;
    for(var i=0;i<lines.length;i++){
        //
        var xy=closestXY(lines[i],mx,my);
        //
        var dx=mx-xy.x;
        var dy=my-xy.y;
        var thisDist=dx*dx+dy*dy;
        if(thisDist<dist){
            dist=thisDist;
            pt=xy;
            index=i;
        }
    }
    var line=lines[index];
    return({ pt:pt, line:line, originalLine:{x0:line.x0,y0:line.y0,x1:line.x1,y1:line.y1} });
}

// linear interpolation -- needed in setClosestLine()
function lerp(a,b,x){return(a+x*(b-a));}

// find closest XY on line to mouse XY
function closestXY(line,mx,my){
    var x0=line.x0;
    var y0=line.y0;
    var x1=line.x1;
    var y1=line.y1;
    var dx=x1-x0;
    var dy=y1-y0;
    var t=((mx-x0)*dx+(my-y0)*dy)/(dx*dx+dy*dy);
    t=Math.max(0,Math.min(1,t));
    var x=lerp(x0,x1,t);
    var y=lerp(y0,y1,t);
    return({x:x,y:y});
}

// draw the scene
function draw(){
    ctx.clearRect(0,0,cw,ch);
    // draw all lines at their current positions
    for(var i=0;i<lines.length;i++){
        drawLine(lines[i],'black');
    }
    // draw markers if a line is being dragged
    if(nearest){
        // point on line nearest to mouse
        ctx.beginPath();
        ctx.arc(nearest.pt.x,nearest.pt.y,5,0,Math.PI*2);
        ctx.strokeStyle='red';
        ctx.stroke();
        // marker for original line before dragging
        drawLine(nearest.originalLine,'red');
        // hightlight the line as its dragged
        drawLine(nearest.line,'red');
    }
}

function drawLine(line,color){
    ctx.beginPath();
    ctx.moveTo(line.x0,line.y0);
    ctx.lineTo(line.x1,line.y1);
    ctx.strokeStyle=color;
    ctx.stroke();
}

function handleMouseDown(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // mouse position
  startX=parseInt(e.clientX-offsetX);
  startY=parseInt(e.clientY-offsetY);
  // find nearest line to mouse
  nearest=closestLine(startX,startY);
  draw();
  // set dragging flag
  isDown=true;
}

function handleMouseUpOut(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // clear dragging flag
  isDown=false;
  nearest=null;
  draw();
}

function handleMouseMove(e){
    if(!isDown){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // mouse position
    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);
    // calc how far mouse has moved since last mousemove event
    var dx=mouseX-startX;
    var dy=mouseY-startY;
    startX=mouseX;
    startY=mouseY;
    // change nearest line vertices by distance moved
    var line=nearest.line;
    line.x0+=dx;
    line.y0+=dy;
    line.x1+=dx;
    line.y1+=dy;
    // redraw
    draw();
}
})
// >>>>>>> 7092d7656a0bb049ec7e1d7fab7847f2e220d474
