import React, { useEffect, useRef } from 'react';
import { useActor } from '@xstate/react';
import { Input, Checkbox, Box, Stack, CloseButton } from '@chakra-ui/react';

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
    <Box my={2}>
      <Stack spacing={5} direction="row" align="center" width={400}>
        <Checkbox
          size="lg"
          onChange={(_) => send('TOGGLE_COMPLETE')}
          isChecked={completed}
        />
        <Input
          value={title}
          onChange={(e) => send({ type: 'CHANGE', value: e.target.value })}
          onClick={(e) => {
            send('EDIT');
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              send('COMMIT');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              send('CANCEL');
            }
          }}
          ref={inputRef}
        />
        <CloseButton onClick={() => send('DELETE')} />
      </Stack>
    </Box>
  );
}
