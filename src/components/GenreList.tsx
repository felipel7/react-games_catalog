import { Button, Image, List, ListItem, Spinner } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';
import useGameStore from '../store';

function GenreList() {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameStore(s => s.gameQuery.genreId);
  const setSelectedGenreId = useGameStore(s => s.setGenreId);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <List width="full">
      {data?.results.slice(0, 13).map(genre => (
        <ListItem key={genre.id}>
          <Button
            alignItems="center"
            borderRadius={10}
            fontSize="lg"
            gap={3}
            justifyContent="flex-start"
            onClick={() => setSelectedGenreId(genre.id)}
            width="full"
            px={4}
            fontWeight={genre.id == selectedGenreId ? 'bold' : 'normal'}
            variant={`${
              genre.id === selectedGenreId ? 'outlineBorder' : 'Link'
            }`}
          >
            <Image
              borderRadius={3}
              boxSize="24px"
              src={getCroppedImageUrl(genre.image_background)}
              objectFit="cover"
            />
            {genre.name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}

export default GenreList;
