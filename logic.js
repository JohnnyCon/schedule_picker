(function() {
  var ClassPicker;

  ClassPicker = (function() {
    function ClassPicker(root, options) {
      this.root = root;
      this.options = options;
      this.root_node = $("." + root).first();
      this.dates_node = $("." + root + " > .dates").first();
      this.times_node = $("." + root + " > .times").first();
      this.classes_node = $("." + root + " > .classes").first();
      this.date_selected;
      this.time_selected;
      this.class_selected;
    }

    ClassPicker.prototype.initialize = function() {
      this.state = "dates";
      return this.render();
    };

    ClassPicker.prototype.render = function() {
      var node, _i, _len, _ref;
      _ref = this.root_node.children("step");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ($(node).hasClass(this.state)) {
          $(node).show();
        } else {
          $(node).hide();
        }
      }
      switch (this.state) {
        case "dates":
          return this.renderDates();
        case "times":
          return this.renderTimes();
        case "classes":
          return this.renderClasses();
      }
    };

    ClassPicker.prototype.renderDates = function() {
      var day, new_node, _i, _len, _ref,
        _this = this;
      console.log("in renderDates");
      console.log(this.options);
      console.log(this.options.days);
      _ref = this.options.days;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        day = _ref[_i];
        new_node = $("<a href='#'><div class='date'>" + day.date + "</div></a>");
        new_node.data('test', 'works');
        this.dates_node.append(new_node);
      }
      return this.dates_node.find("a").click(function(e) {
        _this.state = "times";
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.renderTimes = function() {
      var opt, _i, _len, _ref,
        _this = this;
      console.log("in renderTimes");
      console.log(this.options);
      console.log(this.options.days[0].times);
      _ref = this.options.days[0].times;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        opt = _ref[_i];
        this.times_node.append("<a href='#'><div class='time'>" + opt.time + "</div></a>");
      }
      return this.times_node.find("a").click(function(e) {
        _this.state = "classes";
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.renderClasses = function() {
      var klass, _i, _len, _ref,
        _this = this;
      console.log("in renderClasses");
      console.log(this.options);
      console.log(this.options.days[0].times[0].classes);
      _ref = this.options.days[0].times[0].classes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        klass = _ref[_i];
        this.classes_node.append("<a href='#'><div class='class'>" + klass.instructor + "</div></a>");
      }
      return this.classes_node.find("a").click(function(e) {
        _this.state = "confirm";
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.updateSelections = function() {
      return this.root_node.find("#date-selected").first().text(this.dateSelected());
    };

    ClassPicker.prototype.remove_handlers = function(parent_node) {
      return $(parent_node).find("a").unbind('click');
    };

    ClassPicker.prototype.dateSelected = function() {
      return "None Selected";
    };

    ClassPicker.prototype.timeSelected = function() {
      var _ref;
      return (_ref = this.time_selected) != null ? _ref : "None Selected";
    };

    ClassPicker.prototype.classSelected = function() {
      var _ref;
      return (_ref = this.class_selected) != null ? _ref : "None Selected";
    };

    return ClassPicker;

  })();

  $(document).ready(function() {
    var picker;
    picker = new ClassPicker("container", schedule);
    return picker.initialize();
  });

}).call(this);
