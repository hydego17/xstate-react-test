import React, { useEffect, useRef } from 'react';
import { useActor } from '@xstate/react';
import {
  Box,
  Checkbox,
  Stack,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';

export function Todo({ todoRef }) {
  const [state, send] = useActor(todoRef);

  const inputRef = useRef(null);

  const { id, title, completed } = state.context;

  useEffect(() => {
    if (state.actions.find((action) => action.type === 'focusInput')) {
      inputRef.current && inputRef.current.select();
    }
  }, [state.actions, todoRef]);

  return (
    <>
      <Box my={2}>
        <Stack
          spacing={5}
          direction="row"
          align="center"
          width={400}
          position="relative"
        >
          <Checkbox
            size="lg"
            onChange={(_) => send('TOGGLE_COMPLETE')}
            isChecked={completed}
          />
          <Editable
            value={title}
            onSubmit={() => send('COMMIT')}
            onClick={(e) => {
              send('EDIT');
            }}
          >
            <EditableInput
              onChange={(e) => send({ type: 'CHANGE', value: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  send('CANCEL');
                }
              }}
              ref={inputRef}
            />
            <EditablePreview />
          </Editable>

          <CloseButton
            position="absolute"
            right={1}
            zIndex={2}
            size="sm"
            onClick={() => send('DELETE')}
          />
        </Stack>
      </Box>
  
    </>
  );
}
