
Template.view_resources_list_content.helpers({
  itemTitle: function(item) {
    itemType = item.itemType;
    var title;
    if (itemType === ItemTypeEnum.Resource) {
        title = itemType + ' (' + _resourceDisplayName(item.type) + '): ' + item.details.title;
    } else {
      title = itemType + ': ' + item.details.title;
    }
    return title;
  },
  pathName: function(itemType) {
    return itemType.toLowerCase() + ".view";
  }
});
