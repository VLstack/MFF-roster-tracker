# Unreleased ![version 2.4.0](https://img.shields.io/badge/version-2.4.0-brightgreen.svg?style=flat)

**In progress**

- More javascript refactor

![version 2.3.1](https://img.shields.io/badge/version-2.3.1-brightgreen.svg?style=flat) ![date 2017-04-03](https://img.shields.io/badge/date-2017--04--03-red.svg?style=flat)

**Enhancements:**

- [#39](https://github.com/Mokhet/MFF-roster-tracker/issues/39) When selecting an uniform, auto set rank to normal if not owned


![version 2.3.0](https://img.shields.io/badge/version-2.3.0-brightgreen.svg?style=flat) ![date 2017-04-01](https://img.shields.io/badge/date-2017--04--01-red.svg?style=flat)

**Enhancements:**

- [#13](https://github.com/Mokhet/MFF-roster-tracker/issues/13) Correct naming of all gears based on active uniform
  - Except for Dormammu since I don't have him in my roster yet
  - Except for Captain Marvel with uniform "Secret wars: Captain Marvel & The Carol corp" because it is impossible to have this costume now
- Resync every characters pictures with MFF 2.9.5

**Added:**

- [#15](https://github.com/Mokhet/MFF-roster-tracker/issues/15) Global development score
  - Previous development percent is now Gears Development
  - Added a skills development score
  - Added an uniform development score
- Since 2.2.0 added combat power, now you can also track related Rank
- [#34](https://github.com/Mokhet/MFF-roster-tracker/issues/34) Add tier filter
- Next to "Set all to ...", a new option "Set all unchecked to ..."
- Show total filtered characters

**Fixed bugs:**

- Moving the mouse too quickly from the characters list to the detail no longer trigger an incomplete character state
- Correctly save uniform attributes when no new value was set
- Drastically reduce recursive calls to gears completion
- [#35](https://github.com/Mokhet/MFF-roster-tracker/issues/35) Data error
  - add Hulkbuster T2
  - add Thor Jane Foster T2
  - fixed Hulkbuster uniform from "The avengers" to "Avengers : Age of ultron"
  - fixed Black bolt duplicate uniform key from "attilanrising" to "iar"
- Consistent 2 digits float values
- [#31](https://github.com/Mokhet/MFF-roster-tracker/issues/31) Removed waves effect on every elements
- [#36](https://github.com/Mokhet/MFF-roster-tracker/issues/36) After "Set all to ...", the min, max and average values don't refresh
- [#37](https://github.com/Mokhet/MFF-roster-tracker/issues/37) Unable to remove gears


# ![version 2.2.3](https://img.shields.io/badge/version-2.2.3-brightgreen.svg?style=flat) ![date 2017-03-27](https://img.shields.io/badge/date-2017--03--27-red.svg?style=flat)

**Fixed bugs:**

- [#35](https://github.com/Mokhet/MFF-roster-tracker/issues/35) Data error
  - add Loki T2
  - add Angela T2
  - fixed Satana side from vilain to hero


# ![version 2.2.2](https://img.shields.io/badge/version-2.2.2-brightgreen.svg?style=flat) ![date 2017-03-25](https://img.shields.io/badge/date-2017--03--25-red.svg?style=flat)

**Fixed bugs:**

- Fixed download json file

# ![version 2.2.1](https://img.shields.io/badge/version-2.2.1-brightgreen.svg?style=flat) ![date 2017-03-24](https://img.shields.io/badge/date-2017--03--24-red.svg?style=flat)

**Fixed bugs:**

- [#31](https://github.com/Mokhet/MFF-roster-tracker/issues/31) Removed waves effect on every elements


# ![version 2.2.0](https://img.shields.io/badge/version-2.2.0-brightgreen.svg?style=flat) ![date 2017-03-23](https://img.shields.io/badge/date-2017--03--23-red.svg?style=flat)

**Enhancements:**

- [#12](https://github.com/Mokhet/MFF-roster-tracker/issues/12) Import/Export of selected chars, global revamp of Import/Export feature:
  - Full or partial export
  - Full or partial import
  - Export to text or JSON file
  - Check data validity on import

**Added:**

- [#22](https://github.com/Mokhet/MFF-roster-tracker/issues/22) Tracking uniforms development and dependencies
- [#16](https://github.com/Mokhet/MFF-roster-tracker/issues/16) Keep track of last update and sort by last update
- [#20](https://github.com/Mokhet/MFF-roster-tracker/issues/20) Set all gear options to the same stat in one click
- [#27](https://github.com/Mokhet/MFF-roster-tracker/issues/27) Add "Combat power"

**Fixed bugs:**

- Fix Chrome issue with the search input (Chrome macOs Sierra, I have no clue for windows)
- [#29](https://github.com/Mokhet/MFF-roster-tracker/issues/29) Fix chart when filtering return no matching character


# ![version 2.1.0](https://img.shields.io/badge/version-2.1.0-brightgreen.svg?style=flat) ![date 2017-03-15](https://img.shields.io/badge/date-2017--03--15-red.svg?style=flat)

**Added:**

- MFF 2.9.5 compliant

**Enhancements:**

- Sort characters list by any attributes
- Show sorted attribute value under characters names in the list
- Better synchro between character detail and character list
- Scroll active character to top in list view
- Move all ideas and future enhancements to GitHub [Issues](https://github.com/Mokhet/MFF-roster-tracker/issues)

**Fixed bugs:**

- Fix global chart not covering the whole area
- [#25](https://github.com/Mokhet/MFF-roster-tracker/issues/25) Chart button stay active


# ![version 2.0.1](https://img.shields.io/badge/version-2.0.1-brightgreen.svg?style=flat) ![date 2017-03-11](https://img.shields.io/badge/date-2017--03--11-red.svg?style=flat)

**Fixed bugs:**

- Issue #4 : Default sort not correctly applied
- Issue #5 : Missing "character" variable when creating empty data
- Issue #6 : Global chart not showing, related to issue #4


# ![version 2.0.0](https://img.shields.io/badge/version-2.0.0-brightgreen.svg?style=flat) ![date 2017-03-09](https://img.shields.io/badge/date-2017--03--09-red.svg?style=flat)

**Added:**

- Create public GitHub repository, fork it or help me, your choice :smile:
- Move from local HighCharts 4.2.6 to CDN
- Move from local fontAwesome 4.6.3 to CDN
- Add Google Analytics
- Add Tier-2 to Daisy Johnson, Phil Coulson, Lincoln Campbell and Deathlok as released on 2017-03-08 by Netmarble Mid-month Tier-2 update

**Enhancements:**

- Major UI update
- Rename "Defense penetration" to "Ignore defense" as of Netmarble
- Rename "Abnormal" to "Debuff" in details profile as of Netmarble
- Major refactor of javascript code

**Fixed bugs:**

- Fix a filtering issue with "Destroyer" (it has a "neutral" side and a "neutral" gender)
- Add missing "Attack speed"


# ![version 1.9.0](https://img.shields.io/badge/version-1.9.0-brightgreen.svg?style=flat) ![date 2017-02-15](https://img.shields.io/badge/date-2017--02--15-red.svg?style=flat)

**Added:**

- Compliant with MFF 2.9
- Add icon to toggle character development charts
- Go to character detail on click on chart character point

**Enhancements:**

- Improve chart labels
- Transform attack total + attack bonus to physical attack and energy attack


# ![version 1.8.0](https://img.shields.io/badge/version-1.8.0-brightgreen.svg?style=flat) ![date 2017-01-31](https://img.shields.io/badge/date-2017--01--31-red.svg?style=flat)

**Added:**

- Compliant with 2.8.5 january mid-patch (6 new Tier 2)
- Add attack speed
- Add recovery rate
- Add movement speed
- Add debuff duration
- Add gender and side information
- Allow filtering on genders and sides

**Enhancements:**

- Reorder form
- Transform chart, render using only characters from active list

**Fixed bugs:**

- Fix Medusa species (from human to alien)
- Fix World War Hulk gender (from hero to vilain)


# ![version 1.7.1](https://img.shields.io/badge/version-1.7.1-brightgreen.svg?style=flat) ![date 2017-01-11](https://img.shields.io/badge/date-2017--01--11-red.svg?style=flat)

**Added:**

- Now compliant with MFF 2.8


# ![version 1.7.0](https://img.shields.io/badge/version-1.7.0-brightgreen.svg?style=flat) ![date 2017-01-09](https://img.shields.io/badge/date-2017--01--09-red.svg?style=flat)

**Added:**

- Add defenses
- Add hit points
- Add dodge rate
- Add ignore dodge rate
- Add defense penetration
- Add critical rate
- Add critical damage
- Add skill cooldown

**Enhancements:**

- minor UI update


# ![version 1.6.0](https://img.shields.io/badge/version-1.6.0-brightgreen.svg?style=flat) ![date 2016-12-28](https://img.shields.io/badge/date-2017--12--28-red.svg?style=flat)

- First public release
