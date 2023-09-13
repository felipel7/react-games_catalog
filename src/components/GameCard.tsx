import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { Game } from '../hooks/useGames';
import getCroppedImageUrl from '../services/image-url';
import GameScore from './GameScore';
import PlatformIconList from './PlatformIconList';

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  return (
    <Card
      overflow="hidden"
      bg={useColorModeValue('light.btnGroupBg', 'dark.btnGroupBg')}
    >
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBlockEnd={3}>
          <PlatformIconList
            platforms={game.parent_platforms?.map(p => p.platform)}
          />
          <GameScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl" isTruncated noOfLines={3} whiteSpace="normal">
          {game.name}
        </Heading>
      </CardBody>
    </Card>
  );
}

export default GameCard;
