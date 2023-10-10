FROM httpd:2.4
COPY teste2.html /usr/local/apache2/htdocs/
COPY main.js /usr/local/apache2/htdocs/
#COPY viewStudents.htm /usr/local/apache2/htdocs/
#COPY addStudent.htm /usr/local/apache2/htdocs/
