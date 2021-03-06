(function() {
  var ClassPicker;

  window.ClassPicker = ClassPicker = (function() {
    function ClassPicker(root, options) {
      this.root = root;
      this.options = options;
      this.root_node = $("." + this.root).first();
      this.dates_node = $("." + this.root + " li.dates").first();
      this.times_node = $("." + this.root + " li.times").first();
      this.classes_node = $("." + this.root + " li.classes").first();
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
      _ref = this.root_node.find(".step");
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
      var day, html, new_node, _i, _len, _ref,
        _this = this;
      html = _.template(this.selectDatesTemplate());
      _ref = this.options.days;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        day = _ref[_i];
        new_node = $(html({
          date: day.date
        }));
        this.dates_node.append(new_node);
      }
      return this.dates_node.find("a").click(function(e) {
        _this.state = "times";
        _this.date_selected = $(e.currentTarget).data('selection');
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.renderTimes = function() {
      var html, new_node, opt, _i, _len, _ref,
        _this = this;
      html = _.template(this.selectTimesTemplate());
      _ref = this.options.days[0].times;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        opt = _ref[_i];
        new_node = $(html({
          time: opt.time
        }));
        this.times_node.append(new_node);
      }
      return this.times_node.find("a").click(function(e) {
        _this.state = "classes";
        _this.time_selected = $(e.currentTarget).data('selection');
        e.preventDefault();
        return _this.render();
      });
    };

    ClassPicker.prototype.renderClasses = function() {
      var html, klass, new_node, _i, _len, _ref,
        _this = this;
      html = _.template(this.selectClassesTemplate());
      _ref = this.options.days[0].times[0].classes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        klass = _ref[_i];
        new_node = $(html({
          avatar: klass.avatar,
          instructor: klass.instructor,
          class_id: klass.class_id
        }));
        this.classes_node.append(new_node);
      }
      return this.classes_node.find("a").click(function(e) {
        _this.state = "completed";
        _this.class_selected = $(e.currentTarget).data('selection');
        _this.class_id = $(e.currentTarget).data('class-id');
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

    ClassPicker.prototype.selectDatesTemplate = function() {
      return "<a href='#' data-selection='<%= date %>'>      <div class='date'><%= date %></div>     </a>    ";
    };

    ClassPicker.prototype.selectTimesTemplate = function() {
      return "<a href='#' data-selection='<%= time %>'>      <div class='time'><%= time %></div>     </a>    ";
    };

    ClassPicker.prototype.selectClassesTemplate = function() {
      return "<a href='#' data-selection='<%= instructor %>' data-class-id='<%= class_id %>'>        <div class='avatar'>          <img src='<%= avatar %>' width='70' height='80' />          <div class='class'><%= instructor %></div>        </div>     </a>    ";
    };

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
