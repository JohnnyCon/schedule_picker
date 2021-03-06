
window.ClassPicker = class ClassPicker
  constructor: (@root, @options) ->
    @root_node    = $(".#{@root}").first()
    @dates_node   = $(".#{@root} > .dates").first()
    @times_node   = $(".#{@root} > .times").first()
    @classes_node = $(".#{@root} > .classes").first()
    @date_selected = ""
    @time_selected = ""
    @class_selected = ""
    @class_id = 0
    @state = "dates"
    this.render()

  render: ->
    # set visability
    for node in @root_node.children(".step")
      if $(node).hasClass(@state)
        $(node).show()
      else
        $(node).hide()

    switch @state
      when "dates" then this.renderDates()
      when "times" then this.renderTimes()
      when "classes" then this.renderClasses()
      when "completed" then this.renderCompleted()

    this.updateSelections()
    this.updateCrumbs()
    this.attach_handlers()


  renderDates: ->
    @dates_node.find("a").remove()
    html = _.template(this.selectDatesTemplate())

    for day in @options.days
      new_node = $( html({date: day.date }) )
      @dates_node.append(new_node)

    @dates_node.find("a").click (e) =>
      @state = "times"
      @date_selected = $(e.currentTarget).data('selection')
      e.preventDefault()
      this.render()


  renderTimes: ->
    @times_node.find("a").remove()
    html = _.template(this.selectTimesTemplate())

    for opt in @options.days[0].times
      new_node = $( html({time: opt.time}) )
      @times_node.append(new_node)

    @times_node.find("a").click (e) =>
      @state = "classes"
      @time_selected = $(e.currentTarget).data('selection')
      e.preventDefault()
      this.render()

  renderClasses: ->
    @classes_node.find("a").remove()
    html = _.template(this.selectClassesTemplate())

    for klass in @options.days[0].times[0].classes
      new_node = $( html({avatar: klass.avatar, instructor: klass.instructor, class_id: klass.class_id }) )
      @classes_node.append(new_node)

    @classes_node.find("a").click (e) =>
      @state = "completed"
      @class_selected = $(e.currentTarget).data('selection')
      @class_id = $(e.currentTarget).data('class-id')
      e.preventDefault()
      this.render()

  renderCompleted: ->
    # this is where you would put the confirmation screen/buttons etc..


  updateSelections: ->
    @root_node.find("#date-selected").first().text(this.dateSelected())
    @root_node.find("#time-selected").first().text(this.timeSelected())
    @root_node.find("#class-selected").first().text(this.classSelected())


  updateCrumbs: ->
    breadcrumbs = @root_node.find("span[data-path]").not("span[data-path='start']")
    breadcrumbs.hide()

    switch @state
      when "times"
        @root_node.find("span[data-path='date']").show()
      when "classes"
        @root_node.find("span[data-path='date']").show()
        @root_node.find("span[data-path='time']").show()
      when "completed"
        @root_node.find("span[data-path='date']").show()
        @root_node.find("span[data-path='time']").show()
        @root_node.find("span[data-path='class']").show()

  attach_handlers: ->
    breadcrumbs = @root_node.find("span[data-path]")
    breadcrumbs.unbind 'click'

    nodes = []

    switch @state
      when "times"
        nodes.push @root_node.find("span[data-path='start']")
        nodes.push @root_node.find("span[data-path='date']")
      when "classes"
        nodes.push @root_node.find("span[data-path='start']")
        nodes.push @root_node.find("span[data-path='date']")
        nodes.push @root_node.find("span[data-path='time']")
      when "completed"
        nodes.push @root_node.find("span[data-path='start']")
        nodes.push @root_node.find("span[data-path='date']")
        nodes.push @root_node.find("span[data-path='time']")
        nodes.push @root_node.find("span[data-path='class']")

    for nav in nodes
      nav.click (e) =>
        @state = $(e.currentTarget).data('next')
        this.render()

  remove_handlers: (parent_node) ->
    # $(parent_node).find("a").unbind 'click'



  selectDatesTemplate: ->
    "<a href='#' data-selection='<%= date %>'>
      <div class='date'><%= date %></div>
     </a>
    "

  selectTimesTemplate: ->
    "<a href='#' data-selection='<%= time %>'>
      <div class='time'><%= time %></div>
     </a>
    "

  selectClassesTemplate: ->
    "<a href='#' data-selection='<%= instructor %>' data-class-id='<%= class_id %>'>
        <div class='avatar'>
          <img src='<%= avatar %>' width='70' height='80' />
          <div class='class'><%= instructor %></div>
        </div>
     </a>
    "




  dateSelected: ->
    @date_selected

  timeSelected: ->
    @time_selected

  classSelected: ->
    @class_selected

  classId: ->
    @class_id







    # for node in @root_node.children()
    #   if $(node).hasClass(@state)
    #     @attach_handlers(node)
    #     $(node).show()
    #   else
    #     @remove_handlers(node)
    #     $(node).hide()
