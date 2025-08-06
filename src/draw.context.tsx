import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { SvgElement } from './types/draw-here.types';
import { fromSvgFormat, toSvgFormat } from './utils/svg-serialization';

export interface DrawingState {
  elements: SvgElement[];
  undoHistory: SvgElement[][];
  isDrawGestureDirty: boolean;
}

type DrawingAction =
  | { type: 'ADD_ELEMENT'; payload: SvgElement }
  | { type: 'UNDO' }
  | { type: 'CLEAR' }
  | { type: 'RESET'; payload?: SvgElement[] }
  | { type: 'SET_DIRTY'; payload: boolean };

interface DrawingContextType {
  state: DrawingState;
  addDrawElement: (element: SvgElement) => void;
  undo: () => void;
  clear: () => void;
  reset: (elements?: SvgElement[]) => void;
  setDirty: (isDirty: boolean) => void;
  exportSvg: () => string;
  importSvg: (svg: string) => void;

  // Computed values
  hasUndoHistory: boolean;
  elementsCount: number;
  isCanvasEmpty: boolean;
}

const initialState: DrawingState = {
  elements: [],
  undoHistory: [],
  isDrawGestureDirty: false,
};

interface AddElementToStateArgs {
  state: DrawingState;
  newElement: SvgElement;
}

const addElementToState = ({ state, newElement }: AddElementToStateArgs): DrawingState => ({
  ...state,
  undoHistory: [...state.undoHistory, state.elements],
  elements: [...state.elements, newElement],
});

const undoLastAction = (state: DrawingState): DrawingState => {
  if (state.undoHistory.length === 0) {
    return state;
  }

  const lastElements = state.undoHistory[state.undoHistory.length - 1];
  return {
    ...state,
    undoHistory: state.undoHistory.slice(0, -1),
    elements: lastElements,
    isDrawGestureDirty: true,
  };
};

const clearAllElements = (state: DrawingState): DrawingState => ({
  ...state,
  elements: [],
  undoHistory: [],
  isDrawGestureDirty: true,
});

interface ResetToElementsArgs {
  state: DrawingState;
  elements?: SvgElement[];
}

const resetToElements = ({ state, elements = [] }: ResetToElementsArgs): DrawingState => ({
  ...state,
  elements,
  undoHistory: [],
  isDrawGestureDirty: true,
});

interface SetDirtyStateArgs {
  state: DrawingState;
  isDirty: boolean;
}

const setDirtyState = ({ state, isDirty }: SetDirtyStateArgs): DrawingState => ({
  ...state,
  isDrawGestureDirty: isDirty,
});

const drawingReducer = (state: DrawingState, action: DrawingAction): DrawingState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return addElementToState({ state, newElement: action.payload });

    case 'UNDO':
      return undoLastAction(state);

    case 'CLEAR':
      return clearAllElements(state);

    case 'RESET':
      return resetToElements({ state, elements: action.payload });

    case 'SET_DIRTY':
      return setDirtyState({ state, isDirty: action.payload });

    default:
      console.error('Unknown action', JSON.stringify(action, null, 2));
      return state;
  }
};

const DrawingContext = createContext<DrawingContextType | undefined>(undefined);

interface DrawingProviderProps {
  children: ReactNode;
  onChange?: (state: DrawingState) => void;
}

export const DrawingProvider: React.FC<DrawingProviderProps> = ({ children, onChange }) => {
  const [state, dispatch] = useReducer(drawingReducer, initialState);

  const undo = () => dispatch({ type: 'UNDO' });
  const clear = () => dispatch({ type: 'CLEAR' });
  const reset = (elements?: SvgElement[]) => dispatch({ type: 'RESET', payload: elements });
  const setDirty = (isDirty: boolean) => dispatch({ type: 'SET_DIRTY', payload: isDirty });
  const addDrawElement = (element: SvgElement) => dispatch({ type: 'ADD_ELEMENT', payload: element });

  const importSvg = (content: string) => dispatch({ type: 'RESET', payload: fromSvgFormat({ content }) });
  const exportSvg = (): string => toSvgFormat({ elements: state.elements });

  // Computed values
  const hasUndoHistory = state.undoHistory.length > 0;
  const elementsCount = state.elements.length;
  const isCanvasEmpty = elementsCount === 0;

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  const contextValue: DrawingContextType = {
    state,
    addDrawElement,
    undo,
    clear,
    reset,
    setDirty,
    hasUndoHistory,
    elementsCount,
    isCanvasEmpty,
    exportSvg,
    importSvg,
  };

  return <DrawingContext.Provider value={contextValue}>{children}</DrawingContext.Provider>;
};

export const useDrawing = (): DrawingContextType => {
  const context = useContext(DrawingContext);
  if (context === undefined) {
    throw new Error('useDrawing must be used within a DrawingProvider');
  }

  return context;
};
