export default (dataset) => {
    const hashTable = Object.create(null);
    dataset.forEach(aData => hashTable[aData.id] = {...aData, children: []});
    const dataTree = [];
    dataset.forEach(Datae => {  
      if (Datae.parents  && Datae.parents.length > 0) {    
        Datae.parents.forEach( aData => {    
          hashTable[aData.id].children.push(hashTable[Datae.id])
      });
      }
      else{
      dataTree.push(hashTable[Datae.id])
      }
      
    });
    return dataTree;
  };   