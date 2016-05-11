Template.viewItemHeader.helpers({
  "resourceIcon" : function(resourceType) {
    var icon;
    switch (resourceType) {
      case "book":
        icon = "book"
        break;
      case "video":
        icon = "camera"
        break;
      case "icebreaker":
        icon = "flag"
        break;
      case "other":
        icon = "help"
        break;
      case "shortreading":
        icon = "file text outline"
        break;
      default:
        icon = "folder open outline"
    }
    return icon;
  }
})


// Book - Objects > Book
// Video - Media > Film
// Icebreaker - Message > Flag
// Other - Message > Help
// Short Reading - Computer and File System > File Text Outline
