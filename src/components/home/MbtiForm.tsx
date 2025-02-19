import styled from 'styled-components';
import { useState } from 'react';

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: auto;
    flex-direction: column;
    align-items: center;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 200px;
    box-sizing: border-box;
    margin: 0 auto;
  }
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

  @media (max-width: 768px) {
    width: 200px;
    margin: 0 auto;
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
      <Title>MBTI 기반 애니 추천</Title>
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
