Array.prototype.contains = function(obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function Student(first, last){
  this.name = first + " " + last;
	this.courses = [];
}

Student.prototype.enroll = function(course) {
	if (!(this.courses.contains(course) || this.hasConflict(course))) {
		course.students.push(this);
		return this.courses.push(course);
	 } else {
	 	return console.log("Student is already enrolled or you got some conflicts!");
  }
}

Student.prototype.courseLoad = function() {
	var courseTable = {};

	this.courses.forEach(function(course) {
		if (!courseTable[course.department]) {
			courseTable[course.department] = 0;
		}
  	courseTable[course.department] += course.credits;
  });
	return courseTable;
}

Student.prototype.hasConflict = function(otherCourse) {
	var conflict = false
	for (var i = 0; i < this.courses.length; i++ ) {
		conflict = this.courses[i].conflictsWith(otherCourse)

		if (conflict) {
			break;
		}
	}
	return conflict;
}

function Course(name, department, credits, days, timeBlock ) {
	this.name = name;
	this.department = department;
	this.credits = credits;
	this.students = [];
	this.days = days;
	this.timeBlock = timeBlock;
}

Course.prototype.addStudent = function(student) {
	student.enroll(this);
}
