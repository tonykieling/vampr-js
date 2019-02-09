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
      }
      auxV.offspring.forEach((child) => {
        check(child);
      })
    }
    check(this);
    return result;

    // let result = null;
    
    // let check = function(auxV) {
    //   if (auxV.name === name) {
    //     result = auxV;
    //   }
    //   auxV.offspring.forEach((child) => {
    //     check(child);
    //   })
    // }
    // check(this);
    // return result;

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    console.log("----------------------");
    // let vampires = [];
    // vampires.push(this.name);

    // if (this.offspring > 0) {
    //   this.offspring.forEach((vampire) => {
    //     vampires = vampire.concat(vampire.totalDescendents).name;
    //   });
    // }

    // console.log("vampires: ", vampires);
    // return this.offspring.length;

    let vampires = 0;  
    
    let check = function(vampire) {
      if (vampire.offspring.length > 0) {
        console.log(vampire.offspring);
      // if (Array.isArray(vampire.offspring)) {
        for (const vampire of this.offspring) {
          console.log("vampire: ", vampire);
          check(vampire);
        }
      } else {
        vampires += 1;
      }
console.log("calling");
    check(this);
    console.log("vampires: ", vampires);
    }
    return vampires;
  }
  

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    
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
    // if (this.creator === vampire.creator) {
    //   if (this.yearConverted > vampire.yearConverted) return this;
    //   return vampire;
    // }

    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      while (1) {
        if (vampire.creator === this.creator) {
          return this.creator;
        }
        vampire = vampire.creator;
      }
    } else {
      let temp = this;
      while (1) {
        if (temp.creator === vampire.creator) {
          return vampire.creator;
        }
        temp = temp.creator;
      }
    }
  }

}

module.exports = Vampire;

