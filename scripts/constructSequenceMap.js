async function constructSequenceMap(layoutId, paletteId) {
  // Fetch layout and palette from database or ChatGPT
  const layout = await fetchLayout(layoutId);
  const palette = await fetchPalette(paletteId);

  // Initialize sequence map
  const sequenceMap = {
    layout: layout.name,
    palette: palette.name,
    elements: [],
  };

  // Recursive function to populate elements and styles
  async function populateElements(parentLayout, parentArray) {
    for (const layoutItem of parentLayout.children) {
      const element = await fetchElement(layoutItem.elementId);
      const style = await fetchStyle(layoutItem.styleId);

      const elementObj = {
        type: element.type,
        style: style.name,
        children: [],
      };

      parentArray.push(elementObj);

      if (layoutItem.children && layoutItem.children.length > 0) {
        await populateElements(layoutItem, elementObj.children);
      }
    }
  }

  await populateElements(layout, sequenceMap.elements);

  return sequenceMap;
}
