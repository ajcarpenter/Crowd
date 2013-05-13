// Fixture data 
if (Posts.find().count() === 0) {
  var timestamp = new Date().getTime();

  Posts.insert({
    author: 'tonyhawk',
    content: 'Last night I was treated to Sugarfish Beverly Hills secret Nozawa Bar. If you love sushi, it is imperative that you go; 10 seats only.',
    timestamp: timestamp += 5
  });
  Posts.insert({
    author: 'Horse_ebooks',
    content: 'And These Greedy Bastards Have Been Keeping Their Mouths',
    timestamp: timestamp += 5
  });
  Posts.insert({
    author: 'Jonathan_Blow',
    content: '"It will be no longer acceptable to walk into a room where you cant punch a hole in the wall or break a table and see it splinter."',
    timestamp: timestamp += 5
  });
  Posts.insert({
    author: 'acarpenter',
    content: 'HD remake of Burnout 3 plz. kthx.',
    timestamp: timestamp += 5
  });
  Posts.insert({
    author: 'rockpapershot',
    content: 'Just a quick reminder that were playing Planetside 2 tonight. Please come along if you are a newbie. Instructions go up on RPS at 10AM UK.',
    timestamp: timestamp += 5
  });
  Posts.insert({
    author: 'diskopo',
    content: 'People used to do a lot more shooting guns out of other peoples hands in movies.',
    timestamp: timestamp += 5
  });
  Posts.insert({
    author: 'jeffgerstmann',
    content: 'Doubt anyone cares (since no one said anything when it was broken) but my Trackmania 2 Stadium server, Giant Bomb Official Classic, is up.',
    timestamp: timestamp += 5
  });   
}