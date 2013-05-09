<!DOCTYPE HTML>
<meta charset="utf-8">
<html>
    <head>
    
        <title>Questionnaire</title>
	    <link rel='stylesheet' type='text/css' href='simple.css' />
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		
	</head>
			
    <body>
		
		<form action="">
			
			<h1>Motivation:</h1>
				<table>
					
					<tr>
						<td class='question1' colspan='6'><b>Q1: </b>This person has an enthusiasm for the topics relevant to the position.</td>
					</tr>
					<tr>
						<td><input type="radio" name="q1" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="q1" value="d">Disagree</td>
						<td><input type="radio" name="q1" value="n">Neutral</td>
						<td><input type="radio" name="q1" value="a">Agree</td>
						<td><input type="radio" name="q1" value="sa">Strongly Agree</td>
						<td><input type="radio" name="q1" value="cj">Cannot Judge</td>
					</tr>
					<tr>
						<td class='question2' colspan='6'><b>Q2: </b>This person is well-informed about related tools and techniques.</td>
					</tr>
					<tr>
						<td><input type="radio" name="q2" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="q2" value="d">Disagree</td>
						<td><input type="radio" name="q2" value="n">Neutral</td>
						<td><input type="radio" name="q2" value="a">Agree</td>
						<td><input type="radio" name="q2" value="sa">Strongly Agree</td>
						<td><input type="radio" name="q2" value="cj">Cannot Judge</td>
					</tr>
				</table>
			
			<br><br>
			<h1>Technical Competence:</h1>
				<table>
					<tr>
						<td class='question1' colspan='6'><b>Q3: </b>This person is experienced in coding.</td>
					</tr>
					<tr>
						<td><input type="radio" name="q3" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="q3" value="d">Disagree</td>
						<td><input type="radio" name="q3" value="n">Neutral</td>
						<td><input type="radio" name="q3" value="a">Agree</td>
						<td><input type="radio" name="q3" value="sa">Strongly Agree</td>
						<td><input type="radio" name="q3" value="cj">Cannot Judge</td>
					</tr>
					<tr class='first_show'>
						<td class='question2' colspan='6'><b>Q4: </b>This person writes code that introduces new/important functionality.</td>
					</tr>
					<tr class='first_show'>
						<td><input type="radio" name="q4" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="q4" value="d">Disagree</td>
						<td><input type="radio" name="q4" value="n">Neutral</td>
						<td><input type="radio" name="q4" value="a" id="first_show1">Agree</td>
						<td><input type="radio" name="q4" value="sa" id="first_show2">Strongly Agree</td>
						<td><input type="radio" name="q4" value="cj">Cannot Judge</td>
					</tr>
						<tr style='display: none' class='first_hidden'>
							<td class='question2' colspan='6'><b>Q4.1: </b>Some or all of this functionality is introduced in projects' core.</td>
						</tr>
						<tr style='display: none' class='first_hidden'>
							<td><input type="radio" name="q4.1" value="sd">Strongly Disagree</td>
							<td><input type="radio" name="q4.1" value="d">Disagree</td>
							<td><input type="radio" name="q4.1" value="n">Neutral</td>
							<td><input type="radio" name="q4.1" value="a">Agree</td>
							<td><input type="radio" name="q4.1" value="sa">Strongly Agree</td>
							<td><input type="radio" name="q4.1" value="cj">Cannot Judge</td>
						</tr>
					<tr class='second_show'>
						<td class='question2' colspan='6'><b>Q5: </b>This person writes code that fixes bugs.</td>
					</tr>
					<tr class='second_show'>
						<td><input type="radio" name="q5" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="q5" value="d">Disagree</td>
						<td><input type="radio" name="q5" value="n">Neutral</td>
						<td><input type="radio" name="q5" value="a" id="second_show1">Agree</td>
						<td><input type="radio" name="q5" value="sa" id="second_show2">Strongly Agree</td>
						<td><input type="radio" name="q5" value="cj">Cannot Judge</td>
					</tr>
						<tr style='display: none' class='second_hidden'>
							<td class='question2' colspan='6'><b>Q5.1: </b>This person's bug fixes deal with core project code.</td>
						</tr>
						<tr style='display: none' class='second_hidden'>
							<td><input type="radio" name="q5.1" value="sd">Strongly Disagree</td>
							<td><input type="radio" name="q5.1" value="d">Disagree</td>
							<td><input type="radio" name="q5.1" value="n">Neutral</td>
							<td><input type="radio" name="q5.1" value="a">Agree</td>
							<td><input type="radio" name="q5.1" value="sa">Strongly Agree</td>
							<td><input type="radio" name="q5.1" value="cj">Cannot Judge</td>
						</tr>
				</table>
			
			<br><br>
			<h1>Interpersonal Skills:</h1>
				<table>
					<tr>
						<td class='question1' colspan='6'><b>Q7: </b>This person has experience answering others' questions.</td>
					</tr>
					<tr>
						<td><input type="radio" name="q7" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="a7" value="d">Disagree</td>
						<td><input type="radio" name="q7" value="n">Neutral</td>
						<td><input type="radio" name="q7" value="a">Agree</td>
						<td><input type="radio" name="q7" value="sa">Strongly Agree</td>
						<td><input type="radio" name="q7" value="cj">Cannot Judge</td>
					</tr>
					<tr>
						<td class='question2' colspan='6'><b>Q8: </b>This person is easy to work with [collegial, mentoring].</td>
					</tr>
					<tr>
						<td><input type="radio" name="q8" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="q8" value="d">Disagree</td>
						<td><input type="radio" name="q8" value="n">Neutral</td>
						<td><input type="radio" name="q8" value="a">Agree</td>
						<td><input type="radio" name="q8" value="sa">Strongly Agree</td>
						<td><input type="radio" name="q8" value="cj">Cannot Judge</td>
					</tr>	
				</table>
			
			<br><br>
			<h1>Project Management:</h1>
				<table>
					<tr>
						<td class='question1' colspan='6'><b>Q9: </b>This person has project management skills.</td>
					</tr>
					<tr>
						<td><input type="radio" name="q9" value="sd">Strongly Disagree</td>
						<td><input type="radio" name="q9" value="d">Disagree</td>
						<td><input type="radio" name="q9" value="n">Neutral</td>
						<td><input type="radio" name="q9" value="a">Agree</td>
						<td><input type="radio" name="q9" value="sa">Strongly Agree</td>
						<td><input type="radio" name="q9" value="cj">Cannot Judge</td>
					</tr>
				</table>
		</form>
		
		<script>
			
			$('.first_show').change(function()
				{
					if($('#first_show1').is(':checked') || $('#first_show2').is(':checked'))
					{
						$('.first_hidden').show();
					}
					else
					{
						$('.first_hidden').hide();
					}
				});
			
			$('.second_show').change(function()
				{
					if($('#second_show1').is(':checked') || $('#second_show2').is(':checked'))
					{
						$('.second_hidden').show();
					}
					else
					{
						$('.second_hidden').hide();
					}
				});
			
		</script>
		
    </body>
		
</html>