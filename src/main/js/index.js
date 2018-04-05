import React from 'react';
import { render } from 'react-dom';
import {DiagramsEditor} from "diagrams-editor";

import 'diagrams-editor-app-style';

const app = <DiagramsEditor />;
render(app,document.getElementById('app'));
