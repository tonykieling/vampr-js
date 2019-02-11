// https://gist.github.com/tonykieling/adb0fc35f7368644cf837496f07aa6ad
// https://gist.github.com/tonykieling/fc5ddcad2cc5d90a112c73b08f852974

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

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
    let numberOfVamp = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfVamp += 1;
    }
    return numberOfVamp;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) return true;
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let result = null;
    
    let check = function(auxV) {
      if (auxV.name === name) {
        result = auxV;
        return;
      }
      auxV.offspring.forEach((child) => {
        check(child);
      })
    }
    check(this);
    return result;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let vampires = 0;  
    
    let check = (vampire) => {
      vampire.offspring.forEach((temVamp) => {
        check(temVamp)
      });
      vampires += 1;
    }
    check(this);
    return vampires - 1;
  }
  

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let allMillennials = [];

    let check = (vampire) => {
      if (vampire.yearConverted > 1980) {
        allMillennials.push(vampire);
      }
      vampire.offspring.forEach ((temVamp) => {
        check(temVamp);
      });
    }
    check(this);
    return allMillennials;    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if ((this.numberOfVampiresFromOriginal === 0)) return this;
    if (this.numberOfVampiresFromOriginal === 1 && vampire.numberOfVampiresFromOriginal === 1) return this.creator;
    if (this.name === vampire.name) return this;

    const diff = this.numberOfVampiresFromOriginal - vampire.numberOfVampiresFromOriginal;
    

    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      if (vampire.creator === this) {
        return this;
      }
      while (vampire.creator) {
        if (vampire.creator === this.creator) {
          return this.creator;
        }
        vampire = vampire.creator;
      }
      return vampire;

    } else {
      if (this.creator === vampire) {
        return vampire;
      }      
      let temp = this;
      while (temp.creator) {
        if (temp.creator === vampire.creator) {
          return vampire.creator;
        }
        temp = temp.creator;
      }
    return temp;

    }
  }

}

module.exports = Vampire;

