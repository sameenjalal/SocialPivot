<%- partial('header.ejs', {session: session}) %>

<h1>Welcome to <%= user.username %>'s Profile!</h1>
<div class="well">
	<p><%= user.info %></p>
</div>
<div class="well">
	<h2><%= user.username %>'s Recent Activity:</h2>
	<% for( var i = 0 ; i < recent.length ; i++ ) { %>
		<div class="container">
			<pre>
				<%= if( recent[i].text ) { %>
					<!-- This is a comment and I have: user, idea, rating, text and timestamp -->
					<p><a href="/idea/<%=recent[i].idea.name%>"><%= recent[i].idea.name %></a> created: <%= recent[i].timestamp %></p>
					<p>Created by: <a href="/profile/<%=recent[i].user.username%>"><%= recent[i].user.username %></a></p>
					<p>My comment: <%= recent[i].text %></p>
				<% } else { %>
					<!-- This is an idea and I have: idea_body, name, timestamp -->
					<p><a href="/idea/<%=recent[i].name%>"><%= recent[i].name %></a> created: <%= recent[i].timestamp %></p>
					<p><%= recent[i].idea_body %></p>
					<% if( recent[i].prev !== null ) { %>
						<p>Pivoted from <a href="/idea/<%=recent[i].prev.name%>"><%=recent[i].prev.name%></a> created by:<a href="/profile/<%=recent[i].prev.owner.username%>"><%= recent[i].prev.owner.username %></a></p>
					<% } %>
				<% } %>
			</pre>
		</div>
	<% } %>
</div>

<%- partial('footer.ejs') %>