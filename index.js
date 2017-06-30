function getName(node){
  return node.name
}

function headNode(linkedList, collection){
  const collectionKeys = Object.keys(collection)
  const collectionValues = Object.values(collection)
  const collectionNextValues = collectionValues.map(v => v.next)
  const headKey = collectionKeys.find(key => !collectionNextValues.includes(key))
  return collection[headKey]
}

function next(node, collection){
  return collection[node.next]
}

function nodeAt(i, linkedList, collection){
  let index = 0
  let node = headNode(linkedList, collection)
  while (index < i){
    node = next(node, collection)
    index++
  }
  return node
}

function addressAt(i, linkedList, collection){
  return Object.keys(collection).find(key => collection[key] === nodeAt(i, linkedList, collection))
}

function indexAt(inputNode, collection, linkedList){
  let node = headNode(linkedList, collection)
  for (let i = 0; i < Object.keys(collection).length; i++){
    if (inputNode !== node){
      node = next(node, collection)
    } else {
      return i
    }
  }
  return null
}

function insertNodeAt(i, newNodeKey, linkedList, collection){
  collection[newNodeKey].next = nodeAt(i - 1, linkedList, collection).next
  nodeAt(i - 1, linkedList, collection).next = newNodeKey
}

function deleteNodeAt(i, linkedList, collection){
  let prevNode = nodeAt(i - 1, linkedList, collection)
  const prevNodeAddress = addressAt(i, linkedList, collection)
  let nodeToDelete = nodeAt(i, linkedList, collection)
  const nodeToDeleteAddress = addressAt(i, linkedList, collection)
  prevNode.next = nodeToDelete.next
  // nodeToDelete.next = null
  collection[prevNodeAddress] = prevNode
  // collection[nodeToDeleteAddress] = nodeToDelete
  delete collection[nodeToDeleteAddress]
}
