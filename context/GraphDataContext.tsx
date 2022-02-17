import React, { createContext, useContext } from 'react';
import { GraphProps } from '../types';

const initialGraphProps: GraphProps = {
    values: []
};

export const GraphCtx = createContext(null);





