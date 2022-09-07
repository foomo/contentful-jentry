import { EntryFieldAPI } from '@contentful/app-sdk';
import Editor from '@monaco-editor/react';
import React from 'react';

export interface FieldEditorProps {
    field: EntryFieldAPI;
    locale: string;
    saveFunc: (newValue: string) => void;
    cancelFunc: () => void;
}

const FieldEditor = (props: FieldEditorProps) => {
    const value = props.field.getValue(props.locale)
    const [newValue, setNewValue] = React.useState(JSON.stringify(value,undefined,'  '))

    return (
        <div className='fieldEditorWrapper'>
            <div className='fieldEditorToolbar'>
                <h3>{props.field.id}</h3>
                <div className='buttons'>
                    <a className='button save' onClick={() => props.saveFunc(newValue)}>Save</a>
                    <a className='button cancel' onClick={props.cancelFunc}>Cancel</a>
                </div>
            </div>
            { typeof value === 'object' ?
            (
                <>
                <Editor
                className='json-monaco'
                language='json'
                value={newValue}
                onChange={(value) => {
                  if (value) {
                    setNewValue(value);
                  }
                }}
                options={{ minimap: { enabled: false } }}
              />
</>
            ):(
            <input type="text"/>
            )
            }
    </div>
    )
}
export default FieldEditor;