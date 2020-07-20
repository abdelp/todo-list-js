const canSayHi = self => ({
  sayHi: () => console.log(`Hi! I'm ${self.name}`)
});
const canEat = () => ({
  eat: food => console.log(`Eating ${food}...`)
});
const canPoop = () => ({
  poop: () => console.log('Going to 💩...')
});

// Combined previous behaviours
const socialBehaviors = self => Object.assign({}, canSayHi(self), canEat(), canPoop());

const alligator = name => {
  const self = {
    name
  };

  const alligatorBehaviors = self => ({
    bite: () => console.log("Yum yum!")
  });

  return {...self,
          ...socialBehaviors(self),
          ...alligatorBehaviors(self)};
};