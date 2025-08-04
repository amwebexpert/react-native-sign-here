import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { SvgElement } from './utils/types';

interface SignatureState {
  elements: SvgElement[];
  undoHistory: SvgElement[][];
  isDrawGestureDirty: boolean;
}

type SignatureAction =
  | { type: 'ADD_ELEMENT'; payload: SvgElement }
  | { type: 'UNDO' }
  | { type: 'CLEAR' }
  | { type: 'RESET'; payload?: SvgElement[] }
  | { type: 'SET_DIRTY'; payload: boolean };

interface SignatureContextType {
  state: SignatureState;
  addDrawElement: (element: SvgElement) => void;
  undo: () => void;
  clear: () => void;
  reset: (elements?: SvgElement[]) => void;
  setDirty: (isDirty: boolean) => void;

  // Computed values
  hasUndoHistory: boolean;
  elementsCount: number;
  isCanvasEmpty: boolean;
}

const initialState: SignatureState = {
  elements: [],
  undoHistory: [],
  isDrawGestureDirty: false,
};

interface AddElementToStateArgs {
  state: SignatureState;
  newElement: SvgElement;
}

const addElementToState = ({ state, newElement }: AddElementToStateArgs): SignatureState => ({
  ...state,
  undoHistory: [...state.undoHistory, state.elements],
  elements: [...state.elements, newElement],
});

const undoLastAction = (state: SignatureState): SignatureState => {
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

const clearAllElements = (state: SignatureState): SignatureState => ({
  ...state,
  elements: [],
  undoHistory: [],
  isDrawGestureDirty: true,
});

interface ResetToElementsArgs {
  state: SignatureState;
  elements?: SvgElement[];
}

const resetToElements = ({ state, elements = [] }: ResetToElementsArgs): SignatureState => ({
  ...state,
  elements,
  undoHistory: [],
  isDrawGestureDirty: true,
});

interface SetDirtyStateArgs {
  state: SignatureState;
  isDirty: boolean;
}

const setDirtyState = ({ state, isDirty }: SetDirtyStateArgs): SignatureState => ({
  ...state,
  isDrawGestureDirty: isDirty,
});

const signatureReducer = (state: SignatureState, action: SignatureAction): SignatureState => {
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

const SignatureContext = createContext<SignatureContextType | undefined>(undefined);

interface SignatureProviderProps {
  children: ReactNode;
}

export const SignatureProvider: React.FC<SignatureProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(signatureReducer, initialState);

  const undo = () => dispatch({ type: 'UNDO' });
  const clear = () => dispatch({ type: 'CLEAR' });
  const reset = (elements?: SvgElement[]) => dispatch({ type: 'RESET', payload: elements });
  const setDirty = (isDirty: boolean) => dispatch({ type: 'SET_DIRTY', payload: isDirty });
  const addDrawElement = (element: SvgElement) => dispatch({ type: 'ADD_ELEMENT', payload: element });

  // Computed values
  const hasUndoHistory = state.undoHistory.length > 0;
  const elementsCount = state.elements.length;
  const isCanvasEmpty = elementsCount === 0;

  const contextValue: SignatureContextType = {
    state,
    addDrawElement,
    undo,
    clear,
    reset,
    setDirty,
    hasUndoHistory,
    elementsCount,
    isCanvasEmpty,
  };

  return <SignatureContext.Provider value={contextValue}>{children}</SignatureContext.Provider>;
};

export const useSignature = (): SignatureContextType => {
  const context = useContext(SignatureContext);
  if (context === undefined) {
    throw new Error('useSignature must be used within a SignatureProvider');
  }

  return context;
};
