/* @flow */

import React, { Component } from "react";
import { EditorState } from "draft-js";
import { Editor } from "../../src";
import Portal from '@material-ui/core/Portal';
import Popper from '@material-ui/core/Popper';

class BasicControlledPortal extends Component {
  constructor(props) {
    super(props);
    this.toolbarContainerRef = React.createRef();
  }
  render() {
    console.log("HERE", this.toolbarContainerRef.current);
    
    return (
      <React.Fragment>
        <h3>With popper</h3>
        <BasicControlled />

        <h3>With portal</h3>
        <BasicControlled
            toolbarContainerRef={this.toolbarContainerRef}
          />
        <div style={{border: "solid gray"}} ref={this.toolbarContainerRef} ></div>
      </React.Fragment>
    );
  }
}

class BasicControlled extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    const { toolbarContainerRef } = this.props;
    
    let toolbarContainer = null
    if (toolbarContainerRef) {
      toolbarContainer = <Portal container = { toolbarContainerRef.current } ></Portal>
    }
    else {
      toolbarContainer = this.wrapper ? <Popper open={true} anchorEl={this.wrapper} placement="top"></Popper> : null
    }
    return (
      <div className="rdw-storybook-root">
        <Editor
          toolbarOnFocus
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true }
          }}
        
          ref={ref => {
            if (ref) { this.wrapper = ref.wrapper }
          }}
          toolbarContainer={ toolbarContainer }
        />
      </div>
    );
  }
}

export default BasicControlledPortal;
