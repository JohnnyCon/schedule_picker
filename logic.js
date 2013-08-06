(function() {
  var ClassPicker;

  window.ClassPicker = ClassPicker = (function() {
    function ClassPicker(root, options) {
      this.root = root;
      this.options = options;
      this.root_node = $("." + root).first();
      this.dates_node = $("." + root + " > .dates").first();
      this.times_node = $("." + root + " > .times").first();
      this.classes_node = $("." + root + " > .classes").first();
      this.date_selected = "none";
      this.time_selected = "none";
      this.class_selected = "none";
      this.class_id = 0;
    }

    ClassPicker.prototype.initialize = function() {
      this.state = "dates";
      return this.render();
    };

    ClassPicker.prototype.render = function() {
      var node, _i, _len, _ref;
      _ref = this.root_node.children(".step");
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
          this.renderDates();
          break;
        case "times":
          this.renderTimes();
          break;
        case "classes":
          this.renderClasses();
          break;
        case "completed":
          this.renderCompleted();
      }
      return this.updateSelections();
    };

    ClassPicker.prototype.renderDates = function() {
      var day, new_node, _i, _len, _ref,
        _this = this;
      _ref = this.options.days;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        day = _ref[_i];
        new_node = $("<a href='#'><div class='date'>" + day.date + "</div></a>");
        new_node.data("choice", day.date);
        this.dates_node.append(new_node);
      }
      return this.dates_node.find("a").click(function(e) {
        _this.state = "times";
        _this.date_selected = $(e.currentTarget).data('choice');
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.renderTimes = function() {
      var new_node, opt, _i, _len, _ref,
        _this = this;
      _ref = this.options.days[0].times;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        opt = _ref[_i];
        new_node = $("<a href='#'><div class='time'>" + opt.time + "</div></a>");
        new_node.data("choice", opt.time);
        this.times_node.append(new_node);
      }
      return this.times_node.find("a").click(function(e) {
        _this.state = "classes";
        _this.time_selected = $(e.currentTarget).data('choice');
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.renderClasses = function() {
      var klass, new_node, _i, _len, _ref,
        _this = this;
      _ref = this.options.days[0].times[0].classes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        klass = _ref[_i];
        new_node = $("<a href='#'><div class='class'>" + klass.instructor + "</div></a>");
        new_node.data({
          "choice": klass.instructor,
          "class_id": klass.class_id
        });
        this.classes_node.append(new_node);
      }
      return this.classes_node.find("a").click(function(e) {
        _this.state = "completed";
        _this.class_selected = $(e.currentTarget).data('choice');
        _this.class_id = $(e.currentTarget).data('class_id');
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.renderCompleted = function() {};

    ClassPicker.prototype.updateSelections = function() {
      this.root_node.find("#date-selected").first().text(this.dateSelected());
      this.root_node.find("#time-selected").first().text(this.timeSelected());
      return this.root_node.find("#class-selected").first().text(this.classSelected());
    };

    ClassPicker.prototype.remove_handlers = function(parent_node) {};

    ClassPicker.prototype.dateSelected = function() {
      return this.date_selected;
    };

    ClassPicker.prototype.timeSelected = function() {
      return this.time_selected;
    };

    ClassPicker.prototype.classSelected = function() {
      return this.class_selected;
    };

    ClassPicker.prototype.classId = function() {
      return this.class_id;
    };

    return ClassPicker;

  })();

}).call(this);
