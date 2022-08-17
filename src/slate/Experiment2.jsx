import { useCallback, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './CustomEditor';
import styled from 'styled-components';

function Experiment2() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Text Something ...' }],
    },
  ];

  const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join('\n');
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'change':
        return <ChangeLine {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props) => {
    return <ChangeMark {...props} />;
  }, []);

  return (
    <>
      <h2>Experiment 2 : Serializing(Plain Text)</h2>
      <p>
        <a href='https://docs.slatejs.org/concepts/10-serializing#deserializing'>
          참고
        </a>
      </p>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const content = serialize(value);
          setText(content);
        }}
      >
        <Editable
          className={styles.editor}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
        <div>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleMark(editor);
            }}
          >
            Change Mark
          </button>{' '}
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleBlock(editor);
            }}
          >
            Change Line
          </button>{' '}
        </div>
      </Slate>
      Text: {text}
    </>
  );
}

const Strike = styled.span`
  text-decoration: line-through;
`;

const ChangeLine = (props) => {
  return (
    <p>
      <Strike>{props.children}</Strike>
    </p>
  );
};
const ChangeMark = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.custom ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

const DefaultElement = (props) => {
  return <p>{props.children}</p>;
};

export default Experiment2;
