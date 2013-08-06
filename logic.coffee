
class ClassPicker
  constructor: (@root, @options) ->
    @root_node    = $(".#{root}").first()
    @dates_node   = $(".#{root} > .dates").first()
    @times_node   = $(".#{root} > .times").first()
    @classes_node = $(".#{root} > .classes").first()
    @date_selected
    @time_selected
    @class_selected

  initialize: ->
    @state = "dates"
    this.render()

  render: ->
    # set visability
    for node in @root_node.children("step")
      if $(node).hasClass(@state)
        $(node).show()
      else
        $(node).hide()

    switch @state
      when "dates" then this.renderDates()
      when "times" then this.renderTimes()
      when "classes" then this.renderClasses()

    # this.updateSelections()


  renderDates: ->
    console.log "in renderDates"
    console.log(@options)
    console.log(@options.days)

    for day in @options.days
      new_node = $("<a href='#'><div class='date'>#{day.date}</div></a>")
      new_node.data('test', 'works')
      @dates_node.append(new_node)

    @dates_node.find("a").click (e) =>
      @state = "times"
      e.preventDefault()
      this.render()


  renderTimes: ->
    console.log "in renderTimes"
    console.log(@options)
    console.log(@options.days[0].times)

    for opt in @options.days[0].times
      @times_node.append("<a href='#'><div class='time'>#{opt.time}</div></a>")

    @times_node.find("a").click (e) =>
      @state = "classes"
      e.preventDefault()
      this.render()

  renderClasses: ->
    console.log "in renderClasses"
    console.log(@options)
    console.log(@options.days[0].times[0].classes)

    for klass in @options.days[0].times[0].classes
      @classes_node.append("<a href='#'><div class='class'>#{klass.instructor}</div></a>")

    @classes_node.find("a").click (e) =>
      @state = "confirm"
      e.preventDefault()
      this.render()


  updateSelections: ->
    @root_node.find("#date-selected").first().text(this.dateSelected())



  remove_handlers: (parent_node) ->
    $(parent_node).find("a").unbind 'click'


  dateSelected: ->
    "None Selected"

  timeSelected: ->
    @time_selected ? "None Selected"

  classSelected: ->
    @class_selected ? "None Selected"






$(document).ready ->
  picker = new ClassPicker("container", schedule)
  picker.initialize()



    # for node in @root_node.children()
    #   if $(node).hasClass(@state)
    #     @attach_handlers(node)
    #     $(node).show()
    #   else
    #     @remove_handlers(node)
    #     $(node).hide()
