import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const severityColor = {
  low: '#27ae60',
  medium: '#f1c40f',
  high: '#e67e22',
  critical: '#c0392b',
};

// coloured left border shows the severity
export const Card = styled.div<{ $severity: keyof typeof severityColor }>`
  border: 1px solid var(--border);
  border-left: 6px solid ${({ $severity }) => severityColor[$severity]};
  border-radius: 8px;
  padding: 16px;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4,
  p {
    margin: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--surface);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  color: inherit;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  min-height: 70px;
  font-family: inherit;
  background: var(--bg);
  color: inherit;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  color: inherit;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  & > * {
    flex: 1;
  }
`;

export const Button = styled.button<{ $variant?: 'danger' | 'dark' }>`
  padding: 10px;
  background: ${({ $variant }) =>
    $variant === 'danger' ? '#c0392b' : $variant === 'dark' ? '#333' : 'var(--accent)'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

export const ErrorText = styled.p`
  color: #c0392b;
  margin: 0;
`;

export const Muted = styled.small`
  color: var(--muted);
`;
