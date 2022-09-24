class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVampire = this;
    let numberOfVampires = 0;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires += 1;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    ) {
      return true;
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    const decendant = this.decendants;
    for (const vampire of decendant) {
      if (vampire.name === name) {
        return vampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    return this.decendants.slice(1).length;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampire = [];
    if (this.yearConverted > 1980) {
      vampire.push(this);
    }
    if (this.offspring) {
      for (const child of this.offspring) {
        vampire = vampire.concat(child.allMillennialVampires);
      }
    }
    return vampire;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  ancestor() {
    let ancestors = [];
    ancestors.push(this);
    if (this.creator) {
      ancestors = ancestors.concat(this.creator.ancestor());
    }

    return ancestors;
  }

  get decendants() {
    let decendant = [];
    decendant.push(this);
    if (this.offspring) {
      for (const vampire of this.offspring) {
        decendant = decendant.concat(vampire.decendants);
      }
    }

    return decendant;
  }

  closestCommonAncestor(vampire) {
    let currentVampireAncestor = this.ancestor();
    let vampireAncestors = vampire.ancestor();
    let ancestor = currentVampireAncestor.filter((item) => {
      if (vampireAncestors.indexOf(item) !== -1) {
        return item;
      }
    });

    return ancestor[0];
  }
}

module.exports = Vampire;
