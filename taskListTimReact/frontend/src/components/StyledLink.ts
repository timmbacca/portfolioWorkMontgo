import styled from 'styled-components';

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => theme.palette?.secondary?.main || '#f50057'};
  }
`;

