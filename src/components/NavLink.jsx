import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function NavLink({ to, label }) {
  const { pathname } = useLocation();
  return (
    <Button isActive={to === pathname} size="sm" mr={4}>
      <Link to={to}>{label}</Link>
    </Button>
  );
}
