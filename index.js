import { render } from 'react-dom';
import './index.css';
import * as React from "react";
import { HierarchicalTree, StackPanel, ImageElement, TextElement, SnapConstraints, DiagramComponent, Inject, DataBinding, OverviewComponent, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from './sample-base';
import { DataManager } from "@syncfusion/ej2-data";
import { Tooltip } from '@syncfusion/ej2-popups';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';


import { ish } from './hierarchy/Ishwar.js';
import { vin } from './hierarchy/Vinod.js';
import { pra } from './hierarchy/Praveen.js';
import { pur } from './hierarchy/Purshottam.js';
import { paw } from './hierarchy/Pawan.js';
import { yog } from './hierarchy/Yogesh.js';
import { muk } from './hierarchy/Mukesh.js';
import { bri } from './hierarchy/Brij.js';
import { kom } from './hierarchy/Komal.js';

//Initialize Hierarchy
var data = ish
setHierarchy()

let diagramInstance;
export class Overview extends SampleBase {
    render() {
        return (<div className="control-pane">
        <div className="col-lg-12 control-section">
          <div className="content-wrapper">
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"590px"} 
              tool={DiagramTools.ZoomPan} 
              scrollSettings={{ scrollLimit: "Infinity" }} //Sets the constraints of the SnapSettings
              snapSettings={{ constraints: SnapConstraints.None }} //Configrues organizational chart layout
              layout={{
                  type: "OrganizationalChart",
                  margin: { top: 10 },
                  getLayoutInfo: (node, tree) => {
                      if (!tree.hasSubTree) {
                          tree.orientation = "Vertical";
                          tree.type = "Right";
                      }
                  }
              }} //Sets the parent and child relationship of DataSource.
              dataSourceSettings={{
                  id: "Id",
                  parentId: "ParentId",
                  dataSource: new DataManager(data)
              }} //Sets the default values of Node
              getNodeDefaults={(obj, diagram) => {
                  obj.height = 50;
                  obj.style = { fill: "transparent", strokeWidth: 2 };
                  obj.expandIcon = { shape: 'Minus' };
                  obj.collapseIcon = { shape: 'Plus' };
                  return obj;
              }} //Sets the default values of connector
              getConnectorDefaults={(connector, diagram) => {
                  connector.targetDecorator.shape = "None";
                  connector.type = "Orthogonal";
                  return connector;
              }} 
              //customization of the node.
              setNodeTemplate={(obj, diagram) => {
                  return setNodeTemplate(obj, diagram);
              }}>
              <Inject services={[DataBinding, HierarchicalTree]}/>
            </DiagramComponent>
          </div>
        </div>
        <div className="col-lg-4" style={{
            width: "50%",
            padding: "0px",
            right: "30px",
            bottom: "20px",
            border: "#eeeeee",
            borderStyle: "solid",
            boxShadow: "0px 2px 2px rgba(0,0,0,0.3)",
            background: "#f7f7f7",
            position: "absolute"
        }}>
        </div>
      </div>);
    }
}
//<OverviewComponent id="overview" style={{ top: "30px" }} sourceID="diagram" width={"100%"} height={"150px"}/>
//Funtion to add the Template of the Node.
function setNodeTemplate(obj, diagram) {
    let content = new StackPanel();
    content.id = obj.id + "_outerstack";
    content.orientation = "Horizontal";
    content.style.strokeColor = "gray";
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
    let image = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.style.strokeColor = "none";
    image.source = obj.data.ImageUrl;
    image.id = obj.id + "_pic";
    let innerStack = new StackPanel();
    innerStack.style.strokeColor = "none";
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + "_innerstack";
    let text = new TextElement();
    text.content = obj.data.Name;
    text.style.color = "black";
    text.style.bold = true;
    text.style.strokeColor = "none";
    text.style.fill = "none";
    text.id = obj.id + "_text1";
    let desigText = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = obj.data.Designation;
    desigText.style.color = "black";
    desigText.style.strokeColor = "none";
    desigText.style.fill = "none";
    desigText.style.textWrapping = "Wrap";
    desigText.id = obj.id + "_desig";
    innerStack.children = [text, desigText];
    content.children = [image, innerStack];
    // if(obj.data.isMarried) {
    //   let isMarried = new ImageElement();
    //   isMarried.width = 50;
    //   isMarried.height = 50;
    //   isMarried.style.strokeColor = "none";
    //   isMarried.source = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPWtImHSo2cYYI1s_02A18G-fN4USWqUuEgp9LdIFV2bdrwAK5&usqp=CAU';
    //   isMarried.id = obj.id + "_marriage_pic";

    //   content.children = [image, innerStack, isMarried];
    // } else {
      
    //   content.children = [image, innerStack];
    // }

    innerStack.children = [text, desigText];
    content.children = [image, innerStack];
    return content;
}
function setHierarchy() {
  for (var i = 0; i < vin.length; i++) {
    data.push(vin[i]);
  }
  for (var i = 0; i < pra.length; i++) {
    data.push(pra[i]);
  }
  for (var i = 0; i < pur.length; i++) {
    data.push(pur[i]);
  }
  for (var i = 0; i < paw.length; i++) {
    data.push(paw[i]);
  }
  for (var i = 0; i < yog.length; i++) {
    data.push(yog[i]);
  }
  for (var i = 0; i < muk.length; i++) {
    data.push(muk[i]);
  }
  for (var i = 0; i < bri.length; i++) {
    data.push(bri[i]);
  }
  for (var i = 0; i < kom.length; i++) {
    data.push(kom[i]);
  }
}
render(<Overview />, document.getElementById('sample'));