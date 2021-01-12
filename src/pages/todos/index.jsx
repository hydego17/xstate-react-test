import React from 'react';

import { Box, Input } from '@chakra-ui/react';

import { PageContainer } from '../../components/PageContainer';

export default function TodosPage() {
  return (
    <PageContainer title="todos">
      <Box py={4}>
        <Input type="text" placeholder="What needs to be done?" autoFocus />
      </Box>
    </PageContainer>
  );
}
