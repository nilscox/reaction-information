import React from 'react';

import 'src/App.css';
import { UserProvider } from 'src/utils/UserContext';

import ReactionContainer from './ReactionContainer';
import { parseUser } from 'src/types/User';

export default { title: 'Reaction' };

const reaction: Reaction = {
  id: 1,
  quote: null,
  text: 'Lorem ipsum dolor sit amet...',
  date: new Date('2020-01-01'),
  edited: false,
  history: null,
  repliesCount: 0,
  author: parseUser({
    id: 1,
    nick: 'Foo Bar',
    avatar: null,
  }),
  quickReactionsCount: {
    approve: 182,
    refute: 23,
    skeptic: 97,
  },
  bookmarked: false,
  subscribed: false,
};

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat diam ut venenatis tellus in metus. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. A lacus vestibulum sed arcu non. Massa eget egestas purus viverra accumsan in nisl. Quis risus sed vulputate odio ut enim. Consectetur purus ut faucibus pulvinar elementum integer. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Fames ac turpis egestas maecenas pharetra convallis. Dignissim convallis aenean et tortor at risus viverra. Amet nisl suscipit adipiscing bibendum. Dictum at tempor commodo ullamcorper a lacus. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Rhoncus mattis rhoncus urna neque viverra justo nec. Feugiat pretium nibh ipsum consequat.',
  'Phasellus egestas tellus rutrum tellus. Amet volutpat consequat mauris nunc congue nisi. Id neque aliquam vestibulum morbi. Et leo duis ut diam quam nulla. Sed blandit libero volutpat sed. Porta non pulvinar neque laoreet suspendisse. Cras ornare arcu dui vivamus arcu felis bibendum. Urna condimentum mattis pellentesque id. Varius morbi enim nunc faucibus a. Morbi tincidunt augue interdum velit. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Eget arcu dictum varius duis at consectetur. Aliquam sem et tortor consequat id. Adipiscing elit pellentesque habitant morbi tristique senectus et netus et.',
  'Id volutpat lacus laoreet non curabitur gravida arcu ac. Velit dignissim sodales ut eu sem integer vitae justo eget. Auctor urna nunc id cursus metus aliquam eleifend mi in. Purus in mollis nunc sed id semper. Et egestas quis ipsum suspendisse ultrices. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. In nulla posuere sollicitudin aliquam ultrices sagittis. Maecenas volutpat blandit aliquam etiam erat velit. Arcu dictum varius duis at consectetur lorem donec. Diam vulputate ut pharetra sit amet aliquam id diam maecenas.',
  'Ultricies lacus sed turpis tincidunt id aliquet risus. Ultrices vitae auctor eu augue ut. Proin fermentum leo vel orci porta. Eget egestas purus viverra accumsan in nisl nisi. Amet purus gravida quis blandit turpis cursus in. Donec et odio pellentesque diam volutpat commodo sed egestas. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Imperdiet proin fermentum leo vel orci. Magnis dis parturient montes nascetur ridiculus. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Parturient montes nascetur ridiculus mus mauris. Volutpat blandit aliquam etiam erat velit. Eu sem intger vitae justo eget.',
  'Lobortis feugiat vivamus at augue. Blandit libero volutpat sed cras. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Et molestie ac feugiat sed lectus vestibulum. Lorem ipsum dolor sit amet. Venenatis tellus in metus vulputate eu scelerisque. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Vulputate mi sit amet mauris commodo. Ultricies lacus sed turpis tincidunt id. Mi ipsum faucibus vitae aliquet nec. Cras fermentum odio eu feugiat pretium nibh. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Elit ullamcorper dignissim cras tincidunt lobortis feugia vivamus at. Lacus viverra vitae congue eu consequat. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Adipiscing commodo elit at imperdiet dui accumsan. Fermentum et sollicitudin ac orci phasellus egestas. Tellus molestie nunc non blandit massa enim. In tellus integer feugiat scelerisque.',
].join('\n\n');

const loremMarkdown = [
  '# Relictus umbras narret',
  '',
  '## Fecisse tibi heros intrat aliquid quamvis',
  '',
  'Lorem markdownum et cineres adspexit. Usu *vultus deam mediis*, regem [illa',
  'raptae](http://pressere.net/circumvertitur-antigonen.html) serpens noscere',
  'Ledam. Admirantibus montes Lacedaemoniumque Amyclis volucrumque trahi circumfert',
  'claudere obsessum suscipitur in tibi dea. Obvertit tenet modo rogum notasti duos',
  'eunti nisi carmine vultus.',
  '',
  '- Mensis nos quod precibus cadet libatos',
  '- Gloria talis',
  '- Semperque me',
  '- Adsere et in statione est ripa una',
  '- Dare alta ait fulminis secum videnda at',
  '- Potes pestifera ornate adiuvat intremuit alta illuc',
  '',
  '## Everti talia rubenti posset suorum vitam regentis',
  '',
  'Si et crinem in quarum amantem maior; ita turis quoque nisi nivibus',
  'substrictaque nequeunt satiatae frequentes vertentia. Umbrae et imagine citharae',
  'illum. Si viribus dixit quae silices inpune. Erat egens, mora pervia **nymphae**',
  'miseram et tuta precaria iniuria in. *Domus quodque* terris aura; hic fortius',
  'tertius manus est: tuta quid, tamen caedis sola Styphelumque ipsa?',
  '',
  '1. Ullis prospiciens mixta e temptat centum venerantur',
  '2. Dicta repetita Rhanisque coniuge ilicet Ityosque oculos',
  '3. Sequitur quamque auras non ambagibus morte et',
  '',
  '## Dat illo plus coniuge',
  '',
  '*Aliquem* vertit de fiat cursus amnis. Structa patriosque nigri quos dedisti;',
  'horrifer *solio*.',
  '',
  'Dedit manu nuda Fluctibus fibris: aeratae si pennis licet ara luridus quam.',
  'Supera unda locum minus iuvit, laude *dumque viximus*. Considere in quae nunc',
  'cecidit plena continuam non ora erat. Excedere *secundo templa*? Umbra in haec',
  'querellas obstipuit tractata pinus adsensere, dixere orbem adnuit infans, manu',
  'fert proripit, parenti, [quid](http://et.com/).',
  '',
  '- Modo precor suorum',
  '- Divitis fuit Caulonaque nactus',
  '- Custodia supremis occupat Clytii',
  '- Palmite corpora iussisque Maenalon trahit',
  '- Di Minervae trementi geminaverat me nitidi genetrix',
  '',
  'Vidi levis talem tergo ferrum amens ante lucem mora te praesagaque. [Geminos',
  'vana](http://dedit.com/)? [Legem decusque mittere](http://www.visaque.io/)',
  'tabellae, et percussere et auras et lacertos errare tibi? Flenda celeres quid',
  'Minyis; dixi perpetuos inrita decipis cervus. Munere de deus cavae fessum.',
].join('\n');

export const simpleReaction = () => (
  <UserProvider value={{ user: null, setUser: () => {} }}>
    <ReactionContainer reaction={reaction} />
  </UserProvider>
);

export const reactionWithLongText = () => (
  <UserProvider value={{ user: null, setUser: () => {} }}>
    <ReactionContainer reaction={{ ...reaction, text: lorem }} />
  </UserProvider>
);

export const reactionWithMarkdown = () => (
  <UserProvider value={{ user: null, setUser: () => {} }}>
    <ReactionContainer reaction={{ ...reaction, text: loremMarkdown }} />
  </UserProvider>
);