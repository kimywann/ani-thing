import styled from 'styled-components';
import { useState } from 'react';

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 100px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #357abd;
  }
`;

const MbtiForm = ({ onSubmit }: { onSubmit: (mbti: string) => void }) => {
  const [mbti, setMbti] = useState('');

  const handleSubmit = () => {
    if (mbti.length === 4) {
      onSubmit(mbti);
    } else {
      alert('MBTI를 4글자로 입력해주세요!');
    }
  };

  return (
    <FormContainer>
      <h1 style={{ margin: 0 }}>MBTI 기반 애니 추천</h1>
      <InputGroup>
        <Input
          type="text"
          value={mbti}
          placeholder="MBTI 입력"
          onChange={(e) => setMbti(e.target.value.toUpperCase())}
          maxLength={4}
        />
        <Button onClick={handleSubmit}>추천받기</Button>
      </InputGroup>
    </FormContainer>
  );
};

export default MbtiForm;
