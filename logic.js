(function() {
  var ClassPicker;

  window.ClassPicker = ClassPicker = (function() {
    function ClassPicker(root, options) {
      this.root = root;
      this.options = options;
      this.root_node = $("." + this.root).first();
      this.dates_node = $("." + this.root + " > .dates").first();
      this.times_node = $("." + this.root + " > .times").first();
      this.classes_node = $("." + this.root + " > .classes").first();
      this.date_selected = "";
      this.time_selected = "";
      this.class_selected = "";
      this.class_id = 0;
      this.state = "dates";
      this.render();
    }

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
      this.updateSelections();
      this.updateCrumbs();
      return this.attach_handlers();
    };

    ClassPicker.prototype.renderDates = function() {
      var day, html, new_node, _i, _len, _ref,
        _this = this;
      this.dates_node.find("a").remove();
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
      this.times_node.find("a").remove();
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
      this.classes_node.find("a").remove();
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

    ClassPicker.prototype.updateCrumbs = function() {
      var breadcrumbs;
      breadcrumbs = this.root_node.find("span[data-path]").not("span[data-path='start']");
      breadcrumbs.hide();
      switch (this.state) {
        case "times":
          return this.root_node.find("span[data-path='date']").show();
        case "classes":
          this.root_node.find("span[data-path='date']").show();
          return this.root_node.find("span[data-path='time']").show();
        case "completed":
          this.root_node.find("span[data-path='date']").show();
          this.root_node.find("span[data-path='time']").show();
          return this.root_node.find("span[data-path='class']").show();
      }
    };

    ClassPicker.prototype.attach_handlers = function() {
      var breadcrumbs, nav, nodes, _i, _len, _results,
        _this = this;
      breadcrumbs = this.root_node.find("span[data-path]");
      breadcrumbs.unbind('click');
      nodes = [];
      switch (this.state) {
        case "times":
          nodes.push(this.root_node.find("span[data-path='start']"));
          nodes.push(this.root_node.find("span[data-path='date']"));
          break;
        case "classes":
          nodes.push(this.root_node.find("span[data-path='start']"));
          nodes.push(this.root_node.find("span[data-path='date']"));
          nodes.push(this.root_node.find("span[data-path='time']"));
          break;
        case "completed":
          nodes.push(this.root_node.find("span[data-path='start']"));
          nodes.push(this.root_node.find("span[data-path='date']"));
          nodes.push(this.root_node.find("span[data-path='time']"));
          nodes.push(this.root_node.find("span[data-path='class']"));
      }
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        nav = nodes[_i];
        _results.push(nav.click(function(e) {
          _this.state = $(e.currentTarget).data('next');
          return _this.render();
        }));
      }
      return _results;
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
