import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store';

function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameStore(s => s.setSearchText);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          navigate('/');
        }
      }}
      style={{ width: '100%' }}
    >
      <InputGroup>
        <InputLeftElement children={<BiSearch size={20} color="#4D546B" />} />
        <Input
          _hover={{ filter: 'brightness(95%)' }}
          _placeholder={{ color: '#4D546B' }}
          bg={useColorModeValue('light.btnGroupBg', 'dark.btnGroupBg')}
          borderRadius={10}
          placeholder="Search games..."
          ref={ref}
          variant="filled"
        />
      </InputGroup>
    </form>
  );
}

export default SearchInput;
