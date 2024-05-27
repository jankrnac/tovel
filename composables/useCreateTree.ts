export default (dataset) => {
    const hashTable = Object.create(null)
    dataset.forEach(aData => hashTable[aData._id] = {...aData, children: []})
    const dataTree = [];
    dataset.forEach(Datae => {  
      if (Datae.parents  && Datae.parents.length > 0) {    
        Datae.parents.forEach( aData => {    
          hashTable[aData._id].children.push(hashTable[Datae._id])
      });
      }
      else{
        dataTree.push(hashTable[Datae._id])
      }
      
    });
    return dataTree;
  };   