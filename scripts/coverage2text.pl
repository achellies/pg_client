#!/usr/bin/perl
#
# Nicely format JSCoverage Report as text
#
# Pascal Bihler 2012
#
package CoverageToText;
require HTML::Parser;
@ISA=qw(HTML::Parser);
sub declaration { $_[0]->output("<!$_[1]>")     }
sub process     { $_[0]->output($_[2])          }
sub comment     {}
sub text        { $_[0]->output($_[1])          }

sub start
  {
     my $self = shift;
     my ($tag, $attr, $attrseq, $origtext) = @_;
     $class = $attr->{'class'};
     $self->{show} = 1 if ($tag =~ /^h[12]$/) || (($tag eq "div") && ($class =~ /^(percentage|sloc|hits|misses)$/));
     if ($self->{show} && $class) {
       $class = ucfirst($class);
       $self->output("\n  $class: ");
     } else {
       $self->output("\n\n");
     }
  }
  sub end
  {
     my $self = shift;
     my ($tag, $origtext) = @_;
     $self->{show} = 0;
  }
  sub output
  {
      my $self = shift;
      if ($self->{show}) {
         print @_;
      }
  }

$p = CoverageToText->new->parse_file($ARGV[0]);
print "\n";