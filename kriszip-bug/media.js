require.async("./media/json").addCallback(function () {
  exports.Media = "media";

  require("sys").debug("ok");
})