Then /"(.+?)"(?: within "([^"]*)")? should be visible$/ do |text, selector|
  with_scope(selector) do
    node_with_text(text, :visible).visible?.should be true
  end
end

Then /"(.+?)"(?: within "([^"]*)")? should not be visible$/ do |text, selector|
  with_scope(selector) do
    node_with_text(text, :hidden).visible?.should be false
  end
end

When /^I wait until all animations have finished$/ do
  wait_for_ajax
end

Then /^(?:I\s+)?wait for ajax$/ do
  wait_for_ajax
end

def node_with_text(text, visible)
  find(:xpath, "//*[text() = #{text.inspect}]", visible: visible)
end

